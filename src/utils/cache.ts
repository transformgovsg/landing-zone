// src/utils/cache.ts

import { LRUCache } from 'lru-cache';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
const MAX_CACHE_SIZE = 5 * 1024 * 1024; // 5MB total
const MAX_ENTRIES = 16; // Maximum number of items

interface CacheWrapper<T> {
  data: T | null;
}

const cache = new LRUCache<string, CacheWrapper<object>>({
  max: MAX_ENTRIES,
  maxSize: MAX_CACHE_SIZE,
  sizeCalculation: (value) => {
    try {
      return new TextEncoder().encode(JSON.stringify(value)).length;
    } catch {
      return MAX_CACHE_SIZE; // Conservative estimate if can't calculate
    }
  },
  ttl: CACHE_DURATION,
  allowStale: true,
  updateAgeOnGet: true,
});

export async function getCachedData<T extends object | null>(
  key: string,
  fetchFn: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(key);

  if (cached !== undefined) {
    return cached.data as T;
  }

  const data = await fetchFn();
  cache.set(key, { data });
  return data;
}
