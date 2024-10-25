/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AppException } from '../exceptions/app-exception';

/**
 * ErrorInterceptor to handle HTTP errors globally.
 * Purpose: Centralizes error handling for HTTP responses.
 * Importance: Improves error management and enhances user experience by providing consistent feedback.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandlerService) {}

  /**
   * Intercepts HTTP responses and handles errors using custom exceptions.
   * @param req - The HTTP request to be intercepted.
   * @param next - The next interceptor in the chain.
   * @returns {Observable<HttpEvent<any>>} - The HTTP event or error.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Pass the error to the ErrorHandlerService for centralized handling
        this.errorHandler.handleError(error);

        // Optionally, throw the error to the next handler
        return throwError(() => new AppException('An error occurred during the request.'));
      })
    );
  }
}
