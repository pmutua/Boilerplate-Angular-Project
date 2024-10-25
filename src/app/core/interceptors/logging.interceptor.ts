/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@app/core/services/logger.service';

/**
 * Purpose: Logs details of requests and responses.
 * Importance: Facilitates tracking of API interactions for easier troubleshooting.
 */
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log the request using LoggerService
    // Adjust to log relevant info
    this.logger.info(`Request: ${req.method} ${req.urlWithParams}`)

    return next.handle(req).pipe(
      tap(event => {
        // Log the response using LoggerService
        this.logger.info(`Response: ${event}`);
      })
    );
  }
}
