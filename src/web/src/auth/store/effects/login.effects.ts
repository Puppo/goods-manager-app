import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { AuthService } from '../../shared/services/auth/auth.service';
import * as fromActions from '../actions/login.actions';
import * as fromRoute from '../../../app/store';
import * as fromAuth from '../reducers';

@Injectable()
export class LoginEffect {
  public authState$: Observable<firebase.User>;
  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected authService: AuthService,
    protected afAuth: AngularFireAuth
  ) {
    this.authState$ = afAuth.authState;

    this.authState$.subscribe((user: firebase.User) => {
      if (!!user) {
        const { displayName, email, uid } = user;
        this.store.dispatch(new fromActions.AuthLoginSuccess({ displayName, email, uid }));
      } else {
        this.store.dispatch(new fromActions.AuthLogout());
      }
    });
  }

  @Effect()
  auth$ = this.actions$
    .ofType<fromActions.AuthLogin>(fromActions.AUTH_LOGIN_ACTION)
    .pipe(
      mergeMap(action => {
          const { providerId } = action;
          return this.authService.signIn(providerId)
          .pipe(
            map(result => {
              const {user} = result;
              const { displayName, email, uid } = user;
              return new fromActions.AuthLoginSuccess({ displayName, email, uid });
            }),
            catchError(error => {
              const {code, message} = error;
              return of(new fromActions.AuthLoginFail(code, message));
            })
          );
      })
    );

  @Effect()
  authSuccess$ = this.actions$
    .ofType<fromActions.AuthLoginSuccess>(fromActions.AUTH_LOGIN_SUCCESS_ACTION)
    .pipe(
      map(
        () =>
          new fromRoute.Go({
            path: ['/goods']
          })
      )
    );

  @Effect({ dispatch: false })
  authFail$ = this.actions$
    .ofType<fromActions.AuthLoginFail>(fromActions.AUTH_LOGIN_FAIL_ACTION)
    .pipe(
      tap(action => {
        const { code, message } = action;
        if (code === 'authService/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
        } else {
          alert(message);
        }
      })
    );

  @Effect()
  authLogout$ = this.actions$
    .ofType<fromActions.AuthLogout>(fromActions.AUTH_LOGOUT_ACTION)
    .pipe(
      map(
        () =>
          new fromRoute.Go({
            path: ['/auth']
          })
      )
    );
}
