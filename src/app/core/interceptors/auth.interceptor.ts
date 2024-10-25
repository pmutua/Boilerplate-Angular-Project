/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token')

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          // Add the token to the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });
      // Proceed with the modified request
      return next.handle(cloned);
    }

    // Proceed without modifying the request
    return next.handle(req);
  }
}
