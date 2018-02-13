import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

export const getAuthStateSelector = createSelector(
  fromFeature.getAuthSelector,
  (state: fromFeature.IAuthState) => state.login
);

export const getAuthUserSelector = createSelector(
  getAuthStateSelector,
  fromLogin.getAuthUser
);

export const getAuthIsAuthenticatedSelector = createSelector(
  getAuthStateSelector,
  fromLogin.getAuthIsAuthenticated
);

export const  getAuthUserIdSelector = createSelector(
  getAuthStateSelector,
  fromLogin.getAuthUserId
);
