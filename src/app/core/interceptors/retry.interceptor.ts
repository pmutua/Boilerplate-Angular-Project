/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoggerService } from '@app/core/services/logger.service';

/**
 * Purpose: Automatically retries failed requests.
 * Importance: Increases reliability by handling temporary failures without user intervention.
 */
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private maxRetries = 3;
  private delayMs = 1000;

  constructor(private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.info(`Request: ${req.method} ${req.url}`);

    return next.handle(req).pipe(
      retry({
        count: this.maxRetries,
        delay: () => {
          this.logger.warn(`Request failed. Retrying...`);
          return new Observable<void>(observer => {
            const timeout = setTimeout(() => {
              observer.next();
              observer.complete();
            }, this.delayMs);

            // Cleanup function to clear the timeout
            return () => clearTimeout(timeout);
          });
        },
      }),
      catchError(err => {
        // Log the error after all retries failed
        this.logger.error(`Request failed after ${this.maxRetries} retries: ${err.message}`);
        // Updated usage of throwError
        return throwError(() => new Error(err.message));
      })
    );
  }
}
