import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppException, HttpException } from '../../exceptions';

/**
 * ErrorInterceptor to handle HTTP errors globally.
 Purpose: Centralizes error handling for HTTP responses.
 Importance: Improves error management and enhances user experience by providing consistent feedback.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Intercept HTTP responses and handle errors using custom exceptions.
   * @param req - The HTTP request to be intercepted.
   * @param next - The next interceptor in the chain.
   * @returns {Observable<HttpEvent<any>>} - The HTTP event or error.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error using custom exceptions
        let customError: AppException;

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          customError = new AppException('Client Error', error.error.message);
        } else {
          // Server-side error
          customError = new HttpException(error.status, error.message);
        }

        // Log the custom error
        console.error(customError);
        
        // Optionally, you could further customize the error message or throw different types of errors
        return throwError(customError);
      })
    );
  }
}
