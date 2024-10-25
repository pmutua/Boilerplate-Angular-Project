import { Injectable, signal } from '@angular/core';
import { NOTIFICATION_TYPES } from '../constants/notification-types.constants';

/**
 * NotificationService handles the management and display of notifications.
 * It uses Angular Signals to provide a more reactive and efficient state management.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // A signal to store the current notification message and type.
  private notification = signal<{ type: string; message: string } | null>(null);

  /**
   * Returns the current notification.
   * This signal can be consumed by components to display the notification.
   *
   * @returns signal<{ type: string; message: string } | null>
   */
  getNotification() {
    return this.notification;
  }

  /**
   * Displays a success notification.
   *
   * @param message - The success message to be displayed.
   */
  success(message: string): void {
    this.showNotification(NOTIFICATION_TYPES.SUCCESS, message);
  }

  /**
   * Displays an error notification.
   *
   * @param message - The error message to be displayed.
   */
  error(message: string): void {
    this.showNotification(NOTIFICATION_TYPES.ERROR, message);
  }

  /**
   * Displays a warning notification.
   *
   * @param message - The warning message to be displayed.
   */
  warning(message: string): void {
    this.showNotification(NOTIFICATION_TYPES.WARNING, message);
  }

  /**
   * Displays a notification and automatically clears it after a timeout.
   *
   * @param type - The type of notification (success, error, warning).
   * @param message - The message to be displayed.
   */
  private showNotification(type: string, message: string): void {
    this.notification.set({ type, message });

    // Automatically clear the notification after 5 seconds
    setTimeout(() => this.clearNotification(), 5000);
  }

  /**
   * Clears the current notification.
   */
  clearNotification(): void {
    this.notification.set(null);
  }
}
