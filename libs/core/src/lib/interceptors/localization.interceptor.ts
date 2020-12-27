import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request =
      request.url.includes('loc-saas') && !request.headers.has('Accept-Language')
        ? request.clone({ headers: request.headers.set('Accept-Language', 'en') })
        : request;

    return next.handle(request);
  }
}
