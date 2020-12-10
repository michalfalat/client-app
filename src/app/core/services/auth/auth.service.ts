import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAuthLoginUserResponse } from '../../model/auth/auth.model';
import { login } from './auth.endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  baseUrl(): string {
    return ''; //this.appConfig.backendConfig.apiUrl;
  }

  login = (payload): Observable<IAuthLoginUserResponse> => {
    return of({ token: 'dasdasd' });
    // return this.httpClient.post(login(this.baseUrl()), payload);
  };
}
