import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retryWhen, delay, take } from 'rxjs/operators';
/**
Purpose: Automatically retries failed requests.
Importance: Increases reliability by handling temporary failures without user intervention.
*/
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private maxRetries = 3;
  private delayMs = 1000;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(this.delayMs),
          take(this.maxRetries)
        )
      ),
      catchError(err => throwError(err))
    );
  }
}
