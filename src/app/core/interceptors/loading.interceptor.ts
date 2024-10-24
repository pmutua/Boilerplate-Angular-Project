import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
/**
Purpose: Manages loading indicators during HTTP requests.
Importance: Enhances user experience by visually indicating ongoing processes.
*/
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingService.show();
    return next.handle(req).pipe(
      finalize(() => this._loadingService.hide())
    );
  }
}
