import { Action, createReducer, on } from '@ngrx/store';
import { authLoginResponse } from './auth.actions';

export default interface IAuthState {
  loggedUser?: any;
}

export const initialState: IAuthState = {};

const _authReducer = createReducer(
  initialState,
  on(authLoginResponse, (state: IAuthState, payload) => {
    return { ...state, loggedUser: payload };
  })
);

export function authReducer(state: IAuthState, action: Action): any {
  return _authReducer(state, action);
}
