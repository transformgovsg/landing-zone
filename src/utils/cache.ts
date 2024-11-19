// src/utils/cache.ts
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export async function getCachedData<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: now });
  return data;
}
