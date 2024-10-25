import { Injectable, signal } from '@angular/core';

/**
 * LoggerService provides logging functionality for the application.
 * It allows logging at various levels: info, warning, error, and debug.
 * This service can be extended to send logs to an external system for persistent storage.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // Signal to store the latest log message.
  private latestLog = signal<{ level: string, message: string, timestamp: Date } | null>(null);

  /**
   * Logs an info-level message.
   * @param message The message to log.
   */
  info(message: string): void {
    this.log('info', message);
  }

  /**
   * Logs a warning-level message.
   * @param message The warning message to log.
   */
  warn(message: string): void {
    this.log('warn', message);
  }

  /**
   * Logs an error-level message.
   * @param message The error message to log.
   */
  error(message: string): void {
    this.log('error', message);
    // Here you could send the error to an external service like Sentry
    // Sentry.captureException(new Error(message));
  }

  /**
   * Logs a debug-level message, typically for development.
   * @param message The debug message to log.
   */
  debug(message: string): void {
    this.log('debug', message);
  }

  /**
   * Returns the latest log message signal.
   * This can be consumed by other components or services to respond to log updates.
   *
   * @returns signal<{ level: string, message: string, timestamp: Date } | null>
   */
  getLatestLog() {
    return this.latestLog;
  }

  /**
   * Logs a message at the specified level.
   * @param level The log level (e.g., 'info', 'warn', 'error', 'debug').
   * @param message The message to log.
   */
  private log(level: string, message: string): void {
    const logEntry = { level, message, timestamp: new Date() };

    // Update the latest log signal
    this.latestLog.set(logEntry);

    // Output the log message to the console (can be replaced with external logging services)
    switch (level) {
      case 'info':
        console.info(`[INFO] ${logEntry.timestamp}: ${message}`);
        break;
      case 'warn':
        console.warn(`[WARN] ${logEntry.timestamp}: ${message}`);
        break;
      case 'error':
        console.error(`[ERROR] ${logEntry.timestamp}: ${message}`);
        break;
      case 'debug':
        console.debug(`[DEBUG] ${logEntry.timestamp}: ${message}`);
        break;
      default:
        console.log(`[LOG] ${logEntry.timestamp}: ${message}`);
    }
  }
}
