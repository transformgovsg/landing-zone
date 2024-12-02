// src/utils/cache.ts

import { LRUCache } from 'lru-cache';
import type { AnalyticsData } from '../types/analytics';

interface CacheWrapper<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions {
  ttl?: number;
}

const DEFAULT_TTL = 1000 * 60 * 5; // 5 minutes
const ANALYTICS_TTL = 1000 * 60 * 2; // 2 minutes for analytics data
const MAX_CACHE_SIZE = 10 * 1024 * 1024; // 10MB total
const MAX_ENTRIES = 100;

const cache = new LRUCache<string, CacheWrapper<any>>({
  max: MAX_ENTRIES,
  maxSize: MAX_CACHE_SIZE,
  sizeCalculation: (value) => {
    try {
      return new TextEncoder().encode(JSON.stringify(value)).length;
    } catch {
      return MAX_CACHE_SIZE;
    }
  },
  ttl: DEFAULT_TTL,
  allowStale: true,
  updateAgeOnGet: true,
});

export async function getCachedData<T extends object>(
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions = {},
): Promise<T> {
  const cached = cache.get(key);
  const ttl = options.ttl || (key.startsWith('analytics-') ? ANALYTICS_TTL : DEFAULT_TTL);

  if (cached !== undefined && Date.now() - cached.timestamp < ttl) {
    return cached.data as T;
  }

  const data = await fetchFn();
  cache.set(
    key,
    {
      data,
      timestamp: Date.now(),
    },
    { ttl },
  );

  return data;
}

export function invalidateCache(prefix?: string): void {
  if (prefix) {
    for (const key of cache.keys()) {
      if (key.startsWith(prefix)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}

export async function getCachedAnalytics(
  key: string,
  fetchFn: () => Promise<AnalyticsData>,
): Promise<AnalyticsData> {
  return getCachedData(`analytics-${key}`, fetchFn, { ttl: ANALYTICS_TTL });
}

export function invalidateAnalyticsCache(): void {
  invalidateCache('analytics-');
}

export function updateCachedAnalytics(key: string, data: AnalyticsData): void {
  cache.set(
    `analytics-${key}`,
    {
      data,
      timestamp: Date.now(),
    },
    { ttl: ANALYTICS_TTL },
  );
}
