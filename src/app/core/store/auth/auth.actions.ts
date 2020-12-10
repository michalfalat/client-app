import { createAction, props } from '@ngrx/store';
import {
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
} from '../../model/auth/auth.model';

const PREFIX = '[ AUTH ]';

export const authLoginRequest = createAction(
  `${PREFIX} LOGIN REQUEST`,
  props<{
    payload: IAuthLoginUserRequest;
    onSucceed?: () => void;
    onError?: (error: any) => void;
  }>()
);
export const authLoginResponse = createAction(
  `${PREFIX} LOGIN RESPONSE`,
  props<{
    response: IAuthLoginUserResponse;
  }>()
);
