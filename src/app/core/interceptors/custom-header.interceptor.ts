import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
Purpose: Adds custom headers to requests.
Importance: Enables version control or feature management without modifying each request manually.
*/
@Injectable()
export class CustomHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({
      setHeaders: {
        'X-Custom-Header': 'YourHeaderValue'
      }
    });
    return next.handle(cloned);
  }
}
