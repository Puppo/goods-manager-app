import { Action } from '@ngrx/store';

import * as fromActions from '../actions/login.actions';

export interface IUserState {
  displayName: string;
  email: string;
  uid: string;
}

export interface ILoginState {
  loading: boolean;
  user: IUserState;
  error: {
    code: any;
    message: any;
  };
}

const initialState: ILoginState = {
  loading: false,
  user: null,
  error: null
};

export function reducer(
  state = initialState,
  action: fromActions.LoginActions
): ILoginState {
  switch (action.type) {
    case fromActions.AUTH_LOGIN_ACTION:
      return handleLogin(state, action);
    case fromActions.AUTH_LOGIN_SUCCESS_ACTION:
      return handleLoginSuccess(state, action);
    case fromActions.AUTH_LOGIN_FAIL_ACTION:
      return handleLoginFail(state, action);
    case fromActions.AUTH_LOGOUT_ACTION:
      return handleLogout(state, action);
    default:
      return state;
  }
}

export function handleLogin(
  state: ILoginState,
  action: fromActions.AuthLogin
): ILoginState {
  const loading = true;
  const user = null;
  const error = null;
  return {
    ...state,
    loading,
    user,
    error
  };
}

export function handleLoginSuccess(
  state: ILoginState,
  action: fromActions.AuthLoginSuccess
): ILoginState {
  const loading = false;
  const { user } = action;
  return {
    ...state,
    loading,
    user
  };
}

export function handleLoginFail(
  state: ILoginState,
  action: fromActions.AuthLoginFail
): ILoginState {
  const loading = false;
  const { code, message } = action;
  const error = { code, message };
  return {
    ...state,
    loading,
    error
  };
}

export function handleLogout(
  state: ILoginState,
  action: fromActions.AuthLogout
): ILoginState {
  const user = null;
  const error = null;
  return {
    ...state,
    user,
    error
  };
}

export function getAuthUser(state: ILoginState): IUserState {
  return state.user;
}

export function getAuthIsAuthenticated(state: ILoginState): boolean {
  return !!state.user;
}

export function getAuthUserId(state: ILoginState): string {
  return state.user.uid;
}
