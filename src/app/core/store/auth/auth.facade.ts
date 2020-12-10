import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAuthLoginUserRequest } from '../../model/auth/auth.model';
import { authLoginRequest } from './auth.actions';
import IAuthState from './auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<IAuthState>) {}

  login(payload: IAuthLoginUserRequest): void {
    this.store.dispatch(authLoginRequest({ payload }));
  }
}
