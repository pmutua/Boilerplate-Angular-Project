/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

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
   * @param logger - The LoggerService instance for logging.
   */
  constructor(protected http: HttpClient, protected logger: LoggerService) {}

  /**
   * Performs a GET request.
   * @param endpoint - The endpoint to append to the base URL.
   * @param options - Optional request options.
   * @returns An observable of the response type T.
   */
  protected get<T>(endpoint: string, options?: any): Observable<T> {
    this.logger.info(`Making GET request to ${endpoint}`);
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, this.getRequestOptions(options)).pipe(
      map((event: HttpEvent<T>) => this.extractData(event)),
      catchError((error) => this.handleError(error, 'GET', endpoint))
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
    this.logger.info(`Making POST request to ${endpoint} with body: ${JSON.stringify(body)}`);
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, this.getRequestOptions(options)).pipe(
      map((event: HttpEvent<T>) => this.extractData(event)),
      catchError((error) => this.handleError(error, 'POST', endpoint))
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
    this.logger.info(`Making PUT request to ${endpoint} with body: ${JSON.stringify(body)}`);
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, this.getRequestOptions(options)).pipe(
      map((event: HttpEvent<T>) => this.extractData(event)),
      catchError((error) => this.handleError(error, 'PUT', endpoint))
    );
  }

  /**
   * Performs a DELETE request.
   * @param endpoint - The endpoint to append to the base URL.
   * @param options - Optional request options.
   * @returns An observable of the response type T.
   */
  protected delete<T>(endpoint: string, options?: any): Observable<T> {
    this.logger.info(`Making DELETE request to ${endpoint}`);
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, this.getRequestOptions(options)).pipe(
      map((event: HttpEvent<T>) => this.extractData(event)),
      catchError((error) => this.handleError(error, 'DELETE', endpoint))
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
   * Extracts data from the HttpEvent<T>.
   * This method currently assumes you only want the body of a successful HttpResponse.
   * @param event - The HttpEvent<T> to extract data from.
   * @returns The response body or throws an error if not a valid response.
   */
  private extractData<T>(event: HttpEvent<T>): T {
    if (event instanceof HttpResponse) {
      return event.body as T; // Return the response body
    }
    throw new Error('Invalid response type');
  }

/**
 * Handles HTTP errors.
 * @param error - The HttpErrorResponse object.
 * @param method - The HTTP method that caused the error.
 * @param endpoint - The endpoint that was accessed.
 * @returns An observable with a user-facing error message.
 */
private handleError(error: HttpErrorResponse, method: string, endpoint: string) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  // Log the error
  this.logger.error(`HTTP ${method} request to ${endpoint} failed: ${errorMessage}`);

  // Use the new way to throw an error
  return throwError(() => new Error(errorMessage));
}

}
