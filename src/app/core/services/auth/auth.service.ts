import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthLoginUserRequest, IAuthLoginUserResponse, IAuthRegisterUserRequest, IAuthRegisterUserResponse, IAuthUserInfoResponse } from '../../model/auth/auth.model';
import { loginUrl, registerUrl, userInfoUrl } from './auth.endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  baseUrl(): string {
    return environment.apiUrl;
  }

  login = (payload: IAuthLoginUserRequest): Observable<IAuthLoginUserResponse> => {
    return this.httpClient.post<IAuthLoginUserResponse>(loginUrl(this.baseUrl()), payload);
  };

  register = (payload: IAuthRegisterUserRequest): Observable<IAuthRegisterUserResponse> => {
    return this.httpClient.post<IAuthRegisterUserResponse>(registerUrl(this.baseUrl()), payload);
  };

  userInfo = (): Observable<IAuthUserInfoResponse> => {
    return this.httpClient.get<IAuthUserInfoResponse>(userInfoUrl(this.baseUrl()));
  };
}
