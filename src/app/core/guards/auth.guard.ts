// src/app/core/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard to protect routes from unauthorized access.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determine if the route can be activated.
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns {boolean} - True if the route can be activated, otherwise false.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access
    }

    // Redirect to login if not authenticated
    this.router.navigate(['/login']);
    return false; // Deny access
  }
}
