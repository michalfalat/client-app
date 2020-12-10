import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { authLoginRequest, authLoginResponse } from './auth.actions';
import { AuthService } from './../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginRequest),
      mergeMap(({ payload, onSucceed }) =>
        this.authService.login(payload).pipe(
          map((response) => {
            return authLoginResponse({ response });
          })
          // catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
