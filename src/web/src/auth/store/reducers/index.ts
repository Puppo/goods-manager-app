import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './login.reducer';

export interface IAuthState {
  login: fromAuth.ILoginState;
}

export const reducers: ActionReducerMap<IAuthState> = {
  login: fromAuth.reducer
};

export const getAuthSelector = createFeatureSelector<IAuthState>('auth');
