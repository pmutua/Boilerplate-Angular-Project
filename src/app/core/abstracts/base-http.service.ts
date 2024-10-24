import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Abstract base service for handling HTTP requests.
 * Services extending this class should provide a base URL for API requests.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  /** Base URL for the API. */
  protected abstract baseUrl: string;

  /**
   * Creates an instance of BaseHttpService.
   * @param http - The HttpClient instance for making HTTP requests.
   * @param injector - The Injector instance for dependency injection.
   */
  constructor(protected http: HttpClient, protected injector: Injector) {}

  /**
   * Performs a GET request.
   * @param endpoint - The endpoint to append to the base URL.
   * @param options - Optional request options.
   * @returns An observable of the response type T.
   */
  protected get<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, this.getRequestOptions(options)).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Performs a POST request.
   * @param endpoint - The endpoint to append to the base URL.
   * @param body - The data to send in the request body.
   * @param options - Optional request options.
   * @returns An observable of the response type T.
   */
  protected post<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, this.getRequestOptions(options)).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Performs a PUT request.
   * @param endpoint - The endpoint to append to the base URL.
   * @param body - The data to update in the request body.
   * @param options - Optional request options.
   * @returns An observable of the response type T.
   */
  protected put<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, this.getRequestOptions(options)).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Performs a DELETE request.
   * @param endpoint - The endpoint to append to the base URL.
   * @param options - Optional request options.
   * @returns An observable of the response type T.
   */
  protected delete<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, this.getRequestOptions(options)).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Prepares the request options including headers.
   * @param options - Optional request options.
   * @returns An object containing the request options.
   */
  private getRequestOptions(options?: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add other default headers here if needed
    });

    return {
      headers,
      ...options,
    };
  }

  /**
   * Handles HTTP errors.
   * @param error - The HttpErrorResponse object.
   * @returns An observable with a user-facing error message.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Optionally, log the error to an external service
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
