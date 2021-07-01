import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { AUTH_CONFIG } from '../auth/auth.config'

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated$) {
      return this.auth.getAccessTokenSilently(AUTH_CONFIG).pipe(
        mergeMap(token => {
          if (token) {
            const tokenReq = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(tokenReq);
          }
        })
      );
    }
    return next.handle(request).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
          }
        }
      })
    );
  }
}


