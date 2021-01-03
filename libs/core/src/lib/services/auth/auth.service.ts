import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthLoginUserRequest, IAuthLoginUserResponse, IAuthRegisterUserRequest, IAuthRegisterUserResponse, IAuthUserInfoResponse } from '../../model/auth/auth.model';
import { loginUrl, registerUrl, userInfoUrl } from './auth.endpoints';
import { APP_CONFIG } from '@client-platform/app-config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppLocalStorageKeys } from '../../model/app/app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private localStoragrService: LocalStorageService, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  getAuthToken(): string {
    return this.localStoragrService.get(AppLocalStorageKeys.AUTH_TOKEN);
  }

  saveAuthToken(token: string): void {
    this.localStoragrService.set(AppLocalStorageKeys.AUTH_TOKEN, token);
  }

  login = (payload: IAuthLoginUserRequest): Observable<IAuthLoginUserResponse> => {
    return this.httpClient.post<IAuthLoginUserResponse>(loginUrl(this.baseUrl()), payload);
  };

  register = (payload: IAuthRegisterUserRequest): Observable<IAuthRegisterUserResponse> => {
    return this.httpClient.post<IAuthRegisterUserResponse>(registerUrl(this.baseUrl()), payload, { headers: { 'Content-Type': 'application/json' } });
  };

  userInfo = (): Observable<IAuthUserInfoResponse> => {
    return this.httpClient.get<IAuthUserInfoResponse>(userInfoUrl(this.baseUrl()));
  };
}
