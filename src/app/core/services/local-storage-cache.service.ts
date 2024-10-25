import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageCacheService {

  /**
   * Retrieve cached data from localStorage or fetch fresh data.
   * @param key - The cache key.
   * @param fallback - An observable to fetch fresh data.
   * @returns - An observable of cached or fresh data.
   */
  getOrSetCache<T>(
    key: string,
    fallback: Observable<T>
  ): Observable<T> {
    const cached = localStorage.getItem(key);

    if (cached) {
      const cacheEntry = JSON.parse(cached);
      return of(cacheEntry.data); // Return cached data as an observable
    }

    return fallback.pipe(
      tap((data: T) => this.setCache(key, data))
    );
  }

  /**
   * Set data into localStorage.
   * @param key - The key to associate with the cache entry.
   * @param data - The data to be cached.
   */
  setCache<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify({ data }));
  }
}
