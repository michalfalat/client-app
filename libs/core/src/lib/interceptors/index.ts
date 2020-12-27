import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthorizationInterceptor } from './authorization.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LocalizationInterceptor } from './localization.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LocalizationInterceptor, multi: true },
];
