import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../configs/app.config';

@Injectable()
export class RepeatInterceptor implements HttpInterceptor {
  constructor(private appConfig: AppConfig) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!this.appConfig.timeoutRequests.includes(request.url) && (error.status === 504 || error.status === 408)) {
          this.appConfig.timeoutRequests.push(request.url);
          return next.handle(request);
        }
        this.appConfig.timeoutRequests = this.appConfig.timeoutRequests.filter(r => r !== request.url);
        return throwError(error);
      }),
    );
  }
}
