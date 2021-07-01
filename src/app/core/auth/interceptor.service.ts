/*
This is not being used right now. It can be enabled by adding some additional code to app.routing
*/
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AUTH_CONFIG } from './auth.config'

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor(
    //public auth: AuthService
    ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const tokenReq = req.clone({
        setHeaders: { Authorization: `Basic XXX` }
      });

      return next.handle(tokenReq);
      /*
    req.headers.append('Authorization', 'Basic XXX');
    return next.handle(req);
    */

    /*
    if(this.auth.loggedIn){
      return this.auth.getTokenSilently$(AUTH_CONFIG).pipe(
        mergeMap(token => {
          if(token){
          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(tokenReq);
        }
        }),
        catchError(err => throwError(err))
      );

    }
    else{
      return next.handle(req);
    }
    */
  }
}