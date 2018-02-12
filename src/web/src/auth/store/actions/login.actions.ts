import { Action } from '@ngrx/store';

import { AuthProviders } from '../../shared/services/auth/auth.service';

export const AUTH_LOGIN_ACTION = '[Auth] Login';
export class AuthLogin implements Action {
  readonly type = AUTH_LOGIN_ACTION;
  constructor(public providerId: AuthProviders) {}
}
export const AUTH_LOGIN_SUCCESS_ACTION = '[Auth] Login Success';
export class AuthLoginSuccess implements Action {
  readonly type = AUTH_LOGIN_SUCCESS_ACTION;
  constructor(public user: {
    displayName: string;
    email: string;
    uid: string;
  }) {}
}
export const AUTH_LOGIN_FAIL_ACTION = '[Auth] Login Fail';
export class AuthLoginFail implements Action {
  readonly type = AUTH_LOGIN_FAIL_ACTION;
  constructor(public code: any, public message: any) {}
}
export const AUTH_LOGOUT_ACTION = '[Auth] Logout';
export class AuthLogout implements Action {
  readonly type = AUTH_LOGOUT_ACTION;
}

export type LoginActions =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFail
  | AuthLogout;
