import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { authLoginRequestAction, authLoginResponseAction, authRegisterRequestAction, authRegisterResponseAction } from './auth.actions';
import { AuthService } from './../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginRequestAction),
      mergeMap(({ payload, onSucceeded }) =>
        this.authService.login(payload).pipe(
          map(response => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return authLoginResponseAction({ response });
          }),
          // catchError((error) => of(AuthApiActions.loginFailure({ error })))
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authRegisterRequestAction),
      mergeMap(({ payload, onSucceeded }) =>
        this.authService.register(payload).pipe(
          map(response => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return authRegisterResponseAction({ response });
          }),
          // catchError((error) => of(AuthApiActions.loginFailure({ error })))
        ),
      ),
    ),
  );
}
