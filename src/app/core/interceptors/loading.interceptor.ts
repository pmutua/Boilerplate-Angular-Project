/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * Interceptor for managing loading indicators during HTTP requests.
 *
 * This interceptor enhances user experience by showing a loading indicator
 * when an HTTP request is initiated and hiding it once the request is completed.
 *
 * @class LoadingInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of the LoadingInterceptor.
   *
   * @param {_loadingService} LoadingService - The service responsible for controlling
   * loading indicators.
   */
  constructor(private _loadingService: LoadingService) {}

  /**
   * Intercepts an outgoing HTTP request and displays a loading indicator.
   *
   * @param {HttpRequest<any>} req - The outgoing HTTP request.
   * @param {HttpHandler} next - The next interceptor in the chain.
   * @returns {Observable<HttpEvent<any>>} An observable of the HTTP event.
   *
   * @memberof LoadingInterceptor
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show the loading indicator
    this._loadingService.show();
    return next.handle(req).pipe(
      // Hide the loading indicator on completion
      finalize(() => this._loadingService.hide())
    );
  }
}
