/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * CacheInterceptor
 *
 * Purpose: Caches responses from HTTP requests to improve performance and reduce redundant network calls.
 * Importance: Enhances user experience by speeding up subsequent requests for the same resources.
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: { [url: string]: HttpEvent<any> } = {};

  /**
   * Intercepts outgoing HTTP requests to manage caching.
   *
   * @param req - The outgoing HTTP request.
   * @param next - The next handler to call after the interceptor.
   * @returns An observable of the HTTP event, either from cache or a fresh response.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is already cached
    if (this.cache[req.url]) {
      // Return the cached response
      return of(this.cache[req.url]);
    }

    // Proceed with the request and cache the response
    return next.handle(req).pipe(
      tap(event => {
        // Cache the response for future use
        this.cache[req.url] = event;
      })
    );
  }
}
