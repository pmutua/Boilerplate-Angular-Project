/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { LoggerService } from '@app/core/services/logger.service';

/**
 * Purpose: Sets timeouts for HTTP requests.
 * Importance: Prevents the application from hanging indefinitely, improving user experience.
 */
@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private timeoutMs = 5000; // 5 seconds timeout

  constructor(private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.info(`Starting request: ${req.method} ${req.url} with timeout of ${this.timeoutMs}ms`);

    return next.handle(req).pipe(
      timeout(this.timeoutMs),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          this.logger.error('Request timed out');
        } else {
          this.logger.error('Request failed: ' + err.message);
        }
        return throwError(() => err);
      })
    );
  }
}
