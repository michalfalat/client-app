import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAuthLoginUserRequest, IAuthLoginUserResponse, IAuthRegisterUserRequest, IAuthRegisterUserResponse, IAuthUserInfoResponse } from '../../model/auth/auth.model';
import { authLoginRequestAction, authRegisterRequestAction, authUserInfoRequestAction } from './auth.actions';
import IAuthState from './auth.reducer';
import { getUserInfo } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<IAuthState>) {}
  getUserInfo$ = this.store.pipe(select(getUserInfo));

  login(payload: IAuthLoginUserRequest, onSucceeded?: (response: IAuthLoginUserResponse) => void): void {
    this.store.dispatch(authLoginRequestAction({ payload, onSucceeded }));
  }

  register(payload: IAuthRegisterUserRequest, onSucceeded?: (response: IAuthRegisterUserResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(authRegisterRequestAction({ payload, onSucceeded, onError }));
  }

  userInfo(onSucceeded?: (response: IAuthUserInfoResponse) => void): void {
    this.store.dispatch(authUserInfoRequestAction({ onSucceeded }));
  }
}
