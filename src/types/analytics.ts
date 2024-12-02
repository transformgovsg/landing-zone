// src/types/analytics.ts

export interface PageView {
  timestamp: string;
  source?: string;
  readPercentage?: number;
  timeOnPage?: number;
  device?: string;
  country?: string;
}

export interface PendingUpdate {
  slug: string;
  timestamp: number;
  data: PageView;
}

export interface PostAnalytics {
  views: number;
  uniqueViews: number;
  avgReadPercentage: number;
  avgTimeOnPage: number;
  sources: Record<string, number>;
  readCompletionRates: {
    '25%': number;
    '50%': number;
    '75%': number;
    '100%': number;
  };
  devices: Record<string, number>;
  countries: Record<string, number>;
  viewsOverTime: Record<string, number>;
}

export interface AnalyticsData {
  pageViews: Record<string, PageView[]>;
  aggregated: Record<string, PostAnalytics>;
  lastUpdated: string;
}
