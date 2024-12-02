// src/pages/api/analytics/[slug].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { AnalyticsService } from '../../../services/analytics.service';
import { getDeviceType, getCountry } from '../../../utils/analytics-helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  try {
    if (req.method === 'GET') {
      const analytics = await AnalyticsService.getAnalytics(slug);
      return res.status(200).json(analytics);
    }

    if (req.method === 'POST') {
      const { source, readPercentage, timeOnPage } = req.body;

      const device = getDeviceType();
      const country = await getCountry();

      await AnalyticsService.recordPageView(slug, {
        source,
        readPercentage,
        timeOnPage,
        device,
        country,
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Analytics API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
