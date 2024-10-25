import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard to protect routes from unauthorized access.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Check if the user is logged in and can activate the route.
   * Redirects to the login page if the user is not authenticated.
   *
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns {boolean} - True if the route can be activated, otherwise false.
   */
  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean => {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // Allow access
    }

    // Redirect to login if not authenticated
    // queryParams = This allows the application to remember where the user intended to go before being redirected
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Deny access
  };
}
