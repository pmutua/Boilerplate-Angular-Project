import { Injectable } from '@angular/core';

/**
 * Authentication service to manage user authentication status.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false; // Placeholder for login status

  /**
   * Simulate user login.
   * @returns {boolean} - True if login is successful, otherwise false.
   */
  login(): boolean {
    this.loggedIn = true;
    return this.loggedIn;
  }

  /**
   * Simulate user logout.
   * @returns {boolean} - True if logout is successful, otherwise false.
   */
  logout(): boolean {
    this.loggedIn = false;
    return this.loggedIn;
  }

  /**
   * Check if the user is logged in.
   * @returns {boolean} - True if the user is logged in, otherwise false.
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
