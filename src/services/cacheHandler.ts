import cache from 'memory-cache';

export async function handleCache(key: string, expiracyTime: number, requestCallback: () => Promise<any>) {
  const cachedData = cache.get(key);

  if (cachedData)
    return cachedData;

  const newData = await requestCallback();
  cache.put(key, newData, expiracyTime);

  return newData;
}
