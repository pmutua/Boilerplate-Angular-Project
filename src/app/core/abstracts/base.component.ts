import { OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

/**
 * Abstract base component that provides common functionalities 
 * for all components in the application.
 * 
 * This component offers lifecycle hooks, event handling, error management,
 * and utility methods for managing component interactions. By using this 
 * base component, derived components can reduce code duplication and 
 * focus on their specific logic while leveraging shared functionalities.
 */
export abstract class BaseComponent implements OnInit, OnDestroy {
  
  /** Indicates whether the component is currently active */
  protected isActive: boolean = true;

  /** Event emitter for custom events in derived components */
  @Output() componentEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * This method can be overridden by extending components to perform
   * initialization logic.
   */
  ngOnInit(): void {
    // Logic to run when the component is initialized
  }

  /**
   * Lifecycle hook that is called just before the component is destroyed.
   * This method can be overridden by extending components to perform
   * cleanup logic.
   */
  ngOnDestroy(): void {
    this.isActive = false; // Mark the component as inactive
    // Cleanup logic to avoid memory leaks
  }

  /**
   * Displays a notification message to the user.
   * @param message - The message to be displayed.
   * @param type - The type of notification (e.g., 'success', 'error').
   */
  protected showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    // Implementation for displaying notifications
    console.log(`[${type.toUpperCase()}]: ${message}`);
  }

  /**
   * Sets the active status of the component.
   * @param status - A boolean indicating whether the component is active.
   */
  protected setActiveStatus(status: boolean): void {
    this.isActive = status;
  }

  /**
   * Emits a custom event that can be listened to by parent components.
   * @param eventData - Data to be sent with the event.
   */
  protected emitEvent(eventData: any): void {
    this.componentEvent.emit(eventData);
  }

  /**
   * Handles errors and displays appropriate messages.
   * @param error - The error to handle.
   * @param customMessage - An optional custom message to display.
   */
  protected handleError(error: any, customMessage?: string): void {
    const errorMessage = customMessage || 'An unexpected error occurred.';
    this.showNotification(errorMessage, 'error');
    console.error('Error:', error);
  }

  /**
   * Utility method to toggle the active status of the component.
   */
  protected toggleActiveStatus(): void {
    this.isActive = !this.isActive;
  }
}
