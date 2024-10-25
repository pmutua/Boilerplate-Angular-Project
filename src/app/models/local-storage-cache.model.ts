/**
 * CacheEntry Interface
 *
 * Defines the structure of a cache entry, including the cached data and its expiration time.
 */
export interface CacheEntry<T> {
  data: T;
  expiry: number;
}
