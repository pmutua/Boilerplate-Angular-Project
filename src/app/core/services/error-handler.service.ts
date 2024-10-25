/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorHandler, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger.service';
import { AppException } from '../exceptions/app-exception';

/**
 * Centralized service for handling errors across the application.
 * Uses Angular's `ErrorHandler` for global error handling, logging, and providing user-friendly error messages.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  // Signal to store the latest error
  private latestError = signal<string | null>(null);

  constructor(private logger: LoggerService) {}

  /**
   * Global error handling method that will be called for every unhandled error in the app.
   * Logs the error and sets a user-friendly error message.
   *
   * @param error - The error object to handle
   */
  handleError(error: any): void {
    let errorMessage = 'An unexpected error occurred.';

    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      errorMessage = this.handleHttpError(error);
    } else if (error instanceof AppException) {
      // Handle custom application exceptions
      errorMessage = error.message;
      this.logger.error(`AppException: ${error.message}`);
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors
      errorMessage = error.message;
      this.logger.error(`Error: ${error.message}`);
    } else {
      // Handle other types of errors
      this.logger.error('Unknown error occurred.');
    }

    // Set the latest error signal so that other parts of the app can respond
    this.latestError.set(errorMessage);

    // Log the handled error for debugging purposes
    console.error('Handled Error:', error);
  }

  /**
   * Returns the signal containing the latest error message.
   * Can be consumed by components or services to respond to error state changes.
   *
   * @returns signal<string | null>
   */
  getLatestError() {
    return this.latestError;
  }

  /**
   * Handles HTTP errors and returns user-friendly messages based on the error type and status.
   *
   * @param error - The HTTP error response
   * @returns string - The user-friendly error message
   */
  private handleHttpError(error: HttpErrorResponse): string {
    let message = 'An error occurred while processing your request.';

    switch (error.status) {
      case 400:
        message = 'Bad Request. Please verify your input.';
        break;
      case 401:
        message = 'Unauthorized. Please log in again.';
        break;
      case 403:
        message = 'Forbidden. You do not have permission to perform this action.';
        break;
      case 404:
        message = 'Resource not found.';
        break;
      case 500:
        message = 'Internal Server Error. Please try again later.';
        break;
      default:
        message = error.message || 'An unknown HTTP error occurred.';
        break;
    }

    this.logger.error(`HTTP Error: ${error.status} - ${message}`);
    return message;
  }
}
