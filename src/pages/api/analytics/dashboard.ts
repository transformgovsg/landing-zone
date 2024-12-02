// src/pages/api/analytics/dashboard.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { AnalyticsService } from '../../../services/analytics.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { days = '30' } = req.query;
    const daysNum = parseInt(days as string, 10);

    const [topPosts, growthMetrics] = await Promise.all([
      AnalyticsService.getTopPerformingPosts(10),
      AnalyticsService.getGrowthMetrics(daysNum),
    ]);

    return res.status(200).json({
      topPosts,
      growthMetrics,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
