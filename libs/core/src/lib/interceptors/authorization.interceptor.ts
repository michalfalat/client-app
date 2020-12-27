import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { IZenAuthAccessToken } from '@wakanda/zenauth';
import { get, isString } from 'lodash';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { v4 } from 'uuid';
import { AppConfig } from '../configs/app.config';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { BuildNumberService } from '../services/build-number/build-number.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private authorizeService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private appConfig: AppConfig,
    private buildNumberService: BuildNumberService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authenticators = this.authenticationService.getAuthenticators();
    const token = this.authorizeService.getToken();
    const forbiddenIdempodentyUrls = ['/wallet/v1/referencedata/banks'];

    if (!!authenticators && !!authenticators.xAuthTXId && !!authenticators.xAuthTXToken && !!token && isString(token)) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'X-AUTH-TX-ID': authenticators.xAuthTXId,
          'X-AUTH-TX-TOKEN': authenticators.xAuthTXToken,
        }),
      });

      return next.handle(request).pipe(finalize(() => this.authenticationService.clearAuthenticators()));
    }

    if (!!token && isString(token)) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      });
    }

    if (request.url.includes('loc-saas')) {
      request = request.clone({ headers: request.headers.set('ngsw-bypass', 'true') });
    }

    let deviceId = this.authorizeService.getDeviceId();
    if (!deviceId) {
      deviceId = v4();
      this.authorizeService.setDeviceId(deviceId);
    }

    if (this.appConfig.backendConfig && !request.url.includes('loc-saas')) {
      request = request.clone({
        headers: request.headers.set('X-Avo-SessionId', this.appConfig.backendConfig.sessionId),
      });
      request = request.clone({
        headers: request.headers.set('X-Avo-ApiVersion', '5'),
      });
      request = request.clone({ headers: request.headers.set('X-Avo-DeviceId', deviceId) });
      if (this.buildNumberService.buildNumber) {
        request = request.clone({ headers: request.headers.set('X-AppBuildID', this.buildNumberService.buildNumber) });
      }
    }

    if (forbiddenIdempodentyUrls.some(url => !request.url.includes(url))) {
      if (request.url.includes('/onboarding/externalAuth') && request.body && request.body.code) {
        request = request.clone({ headers: request.headers.set('x-idempotency-key', request.body.code) });
      } else {
        request = request.clone({ headers: request.headers.set('x-idempotency-key', v4()) });
      }
    }

    if (
      request.url.endsWith('/start') ||
      request.url.endsWith('/authenticate') ||
      request.url.endsWith('/setLogin') ||
      request.url.endsWith('/moneyapp')
    ) {
      return next.handle(request).pipe(
        map((response: HttpEvent<any>) => {
          const accessToken = get(response, 'body.accessToken');
          if (accessToken) {
            if (isString(accessToken)) {
              const newToken: IZenAuthAccessToken = {
                access_token: accessToken,
                expires_in: get(response, 'body.expiresIn'),
                token_type: get(response, 'body.tokenType'),
              };
              this.authorizeService.setAccessToken(newToken);
            } else {
              this.authorizeService.setAccessToken(accessToken);
            }
          }
          return response;
        }),
      );
    }

    return next.handle(request);
  }
}
