import { Injectable, signal } from '@angular/core';

/**
 * A service to manage the loading state of the application.
 * This service uses Angular Signals to provide a reactive loading state
 * that components can subscribe to.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Using Angular Signals for loading state
  private loading = signal(false);

  /**
   * Gets a read-only version of the loading signal.
   * Components can subscribe to this signal to react to loading state changes.
   */
  get loading$() {
    return this.loading();
  }

  /**
   * Sets the loading state to true.
   * This method should be called when a loading operation starts.
   */
  show() {
    this.loading.set(true);
  }

  /**
   * Sets the loading state to false.
   * This method should be called when a loading operation ends.
   */
  hide() {
    this.loading.set(false);
  }
}
