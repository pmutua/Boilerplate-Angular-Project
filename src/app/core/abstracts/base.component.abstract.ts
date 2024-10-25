/* eslint-disable @typescript-eslint/no-explicit-any */
import { OnInit, OnDestroy, EventEmitter, Output, Component } from '@angular/core';

/**
 * Abstract base component that provides common functionalities
 * for all components in the application.
 *
 * This component offers lifecycle hooks, event handling, error management,
 * and utility methods for managing component interactions. By using this
 * base component, derived components can reduce code duplication and
 * focus on their specific logic while leveraging shared functionalities.
 */
@Component({
  template: '' // Base components typically do not have a template
})
export abstract class BaseComponent implements OnInit, OnDestroy {

  /** Indicates whether the component is currently active */
  protected isActive: boolean = true;

  /** Event emitter for custom events in derived components */
  @Output() componentEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    // Logic to run when the component is initialized
  }

  ngOnDestroy(): void {
    this.isActive = false; // Mark the component as inactive
    // Cleanup logic to avoid memory leaks
  }

  protected showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    console.log(`[${type.toUpperCase()}]: ${message}`);
  }

  protected setActiveStatus(status: boolean): void {
    this.isActive = status;
  }

  protected emitEvent(eventData: any): void {
    this.componentEvent.emit(eventData);
  }

  protected handleError(error: any, customMessage?: string): void {
    const errorMessage = customMessage || 'An unexpected error occurred.';
    this.showNotification(errorMessage, 'error');
    console.error('Error:', error);
  }

  protected toggleActiveStatus(): void {
    this.isActive = !this.isActive;
  }
}
