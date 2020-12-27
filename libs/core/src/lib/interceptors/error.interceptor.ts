import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WebSocketService } from '../services/websockets/websockets.service';
import { AppConfig } from '../configs/app.config';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { HttpErrorConsoleLogger } from '../services/logger/http-error-console.logger';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private webSocketService: WebSocketService,
    private appConfig: AppConfig,
    private logger: HttpErrorConsoleLogger,
  ) {}

  private navigateToLogin = (): void => {
    this.router.navigateByUrl(encodeURI('/login'));
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.removeAccessToken();
          this.webSocketService.closeConnection();
          return throwError(error);
        }

        if (error.status >= 400) {
          if (this.appConfig && this.appConfig.backendConfig) {
            this.logger.info(this.appConfig.backendConfig.sessionId, error);
          }
        }

        if (error && error.error && error.error.postAction && error.error.postAction === 'LOGOUT') {
          this.authService.removeAccessToken();
          this.webSocketService.closeConnection();
          this.navigateToLogin();
        }

        return throwError(error);
      }),
    );
  }
}
