/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * CustomHeaderInterceptor
 *
 * Purpose: Adds custom headers to outgoing HTTP requests.
 * Importance: Enables version control or feature management without modifying each request manually.
 */
@Injectable()
export class CustomHeaderInterceptor implements HttpInterceptor {
  /**
   * Intercepts outgoing HTTP requests to add custom headers.
   *
   * @param req - The original HTTP request.
   * @param next - The next handler to call after the interceptor.
   * @returns An observable of the HTTP event, with custom headers added.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add new headers
    const cloned = req.clone({
      setHeaders: {
        // Custom header added to the request
        'X-Custom-Header': 'YourHeaderValue'
      }
    });

    // Forward the cloned request to the next handler
    return next.handle(cloned);
  }
}
