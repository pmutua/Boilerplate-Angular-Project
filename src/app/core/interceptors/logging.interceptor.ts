import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
Purpose: Logs details of requests and responses.
Importance: Facilitates tracking of API interactions for easier troubleshooting.
/
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request:', req);
    return next.handle(req).pipe(
      tap(event => console.log('Response:', event))
    );
  }
}
