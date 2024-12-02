// src/services/analytics.service.ts

import type { PageView, PostAnalytics, AnalyticsData, PendingUpdate } from '../types/analytics';
import { getCachedData } from '../utils/cache';
import { getGithubFile, updateGithubFile } from '../utils/github';

export class AnalyticsService {
  private static readonly GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  private static readonly GITHUB_OWNER = process.env.GITHUB_OWNER;
  private static readonly GITHUB_REPO = process.env.GITHUB_REPO;
  private static readonly ANALYTICS_PATH = 'data/analytics.json';
  private static readonly UPDATE_INTERVAL = 60000; // 1 minute
  private static readonly BATCH_SIZE = 10;

  private static pendingUpdates: PendingUpdate[] = [];
  private static updateTimeout: NodeJS.Timeout | null = null;
  private static lastSha: string = '';

  private static async getAnalyticsFile(): Promise<AnalyticsData> {
    return getCachedData(
      'analytics-data',
      async () => {
        const { content, sha } = await getGithubFile(
          this.GITHUB_OWNER,
          this.GITHUB_REPO,
          this.ANALYTICS_PATH,
        );

        this.lastSha = sha;

        if (!content) {
          return {
            pageViews: {},
            aggregated: {},
            lastUpdated: new Date().toISOString(),
          };
        }

        return JSON.parse(content);
      },
      { ttl: 300000 }, // 5 minutes cache
    );
  }

  private static async saveAnalyticsFile(data: AnalyticsData): Promise<void> {
    await updateGithubFile(
      this.GITHUB_OWNER,
      this.GITHUB_REPO,
      this.ANALYTICS_PATH,
      JSON.stringify(data, null, 2),
      this.lastSha,
    );
  }

  private static async aggregateAnalytics(views: PageView[]): Promise<PostAnalytics> {
    const uniqueViews = new Set(views.map((v) => v.timestamp.substring(0, 10))).size;

    const readPercentages = views.map((v) => v.readPercentage || 0).filter((p) => p > 0);

    const timeOnPage = views.map((v) => v.timeOnPage || 0).filter((t) => t > 0);

    const sources = views.reduce(
      (acc, view) => {
        if (view.source) {
          acc[view.source] = (acc[view.source] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const devices = views.reduce(
      (acc, view) => {
        if (view.device) {
          acc[view.device] = (acc[view.device] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const countries = views.reduce(
      (acc, view) => {
        if (view.country) {
          acc[view.country] = (acc[view.country] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const viewsOverTime = views.reduce(
      (acc, view) => {
        const date = view.timestamp.substring(0, 10);
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const readCompletionRates = {
      '25%': views.filter((v) => (v.readPercentage || 0) >= 25).length,
      '50%': views.filter((v) => (v.readPercentage || 0) >= 50).length,
      '75%': views.filter((v) => (v.readPercentage || 0) >= 75).length,
      '100%': views.filter((v) => (v.readPercentage || 0) >= 100).length,
    };

    return {
      views: views.length,
      uniqueViews,
      avgReadPercentage: readPercentages.length
        ? readPercentages.reduce((a, b) => a + b, 0) / readPercentages.length
        : 0,
      avgTimeOnPage: timeOnPage.length
        ? timeOnPage.reduce((a, b) => a + b, 0) / timeOnPage.length
        : 0,
      sources,
      readCompletionRates,
      devices,
      countries,
      viewsOverTime,
    };
  }

  private static async processBatchUpdate(): Promise<void> {
    if (this.pendingUpdates.length === 0) return;

    try {
      const analytics = await this.getAnalyticsFile();
      let updated = false;

      while (this.pendingUpdates.length > 0) {
        const batch = this.pendingUpdates.splice(0, this.BATCH_SIZE);

        for (const update of batch) {
          if (!analytics.pageViews[update.slug]) {
            analytics.pageViews[update.slug] = [];
          }
          analytics.pageViews[update.slug].push(update.data);
          updated = true;
        }
      }

      if (updated) {
        for (const [slug, views] of Object.entries(analytics.pageViews)) {
          analytics.aggregated[slug] = await this.aggregateAnalytics(views);
        }

        analytics.lastUpdated = new Date().toISOString();
        await this.saveAnalyticsFile(analytics);
      }
    } catch (error) {
      // Restore pending updates that failed to process
      this.pendingUpdates = [...this.pendingUpdates];
      console.error('Failed to process analytics batch:', error);
      throw error;
    }
  }

  private static scheduleBatchUpdate(): void {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    this.updateTimeout = setTimeout(async () => {
      try {
        await this.processBatchUpdate();
      } catch (error) {
        console.error('Batch update failed:', error);
      } finally {
        this.updateTimeout = null;
      }
    }, this.UPDATE_INTERVAL);
  }

  static async recordPageView(slug: string, data: Partial<PageView>): Promise<void> {
    const view: PageView = {
      timestamp: new Date().toISOString(),
      ...data,
    };

    this.pendingUpdates.push({
      slug,
      timestamp: Date.now(),
      data: view,
    });

    this.scheduleBatchUpdate();
  }

  static async getAnalytics(slug: string): Promise<PostAnalytics> {
    const analytics = await this.getAnalyticsFile();
    const views = analytics.pageViews[slug] || [];
    return this.aggregateAnalytics(views);
  }

  static async getPageViews(slug: string): Promise<number> {
    const analytics = await this.getAnalyticsFile();
    return analytics.pageViews[slug]?.length || 0;
  }

  static async getTopPerformingPosts(
    limit: number = 10,
  ): Promise<Array<{ slug: string; analytics: PostAnalytics }>> {
    const analytics = await this.getAnalyticsFile();
    return Object.entries(analytics.aggregated)
      .sort(([, a], [, b]) => b.views - a.views)
      .slice(0, limit)
      .map(([slug, data]) => ({ slug, analytics: data }));
  }

  static async getEngagementMetrics(slug: string): Promise<{
    readThroughRate: number;
    avgEngagementTime: number;
    topSources: Array<{ source: string; count: number }>;
  }> {
    const analytics = await this.getAnalytics(slug);

    return {
      readThroughRate: (analytics.readCompletionRates['100%'] / analytics.views) * 100,
      avgEngagementTime: analytics.avgTimeOnPage,
      topSources: Object.entries(analytics.sources)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([source, count]) => ({ source, count })),
    };
  }

  static async getGrowthMetrics(days: number = 30): Promise<{
    totalViews: number;
    growthRate: number;
    viewsChart: Record<string, number>;
  }> {
    const analytics = await this.getAnalyticsFile();
    const now = new Date();
    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const viewsOverTime = Object.values(analytics.aggregated).reduce(
      (acc, post) => {
        Object.entries(post.viewsOverTime).forEach(([date, count]) => {
          if (new Date(date) >= pastDate) {
            acc[date] = (acc[date] || 0) + count;
          }
        });
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalViews = Object.values(viewsOverTime).reduce((a, b) => a + b, 0);
    const previousPeriodViews = Object.entries(viewsOverTime)
      .filter(([date]) => new Date(date).getTime() < now.getTime() - days * 24 * 60 * 60 * 1000)
      .reduce((sum, [, count]) => sum + count, 0);

    return {
      totalViews,
      growthRate: previousPeriodViews
        ? ((totalViews - previousPeriodViews) / previousPeriodViews) * 100
        : 0,
      viewsChart: viewsOverTime,
    };
  }
}
