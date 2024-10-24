import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
Purpose: Sets timeouts for HTTP requests.
Importance: Prevents the application from hanging indefinitely, improving user experience.
*/
@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private timeoutMs = 5000; // 5 seconds timeout

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(this.timeoutMs),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          console.error('Request timed out');
        }
        return throwError(err);
      })
    );
  }
}
