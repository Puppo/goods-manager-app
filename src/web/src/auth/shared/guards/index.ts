import {AuthGuard} from './auth.guards';
import {UnauthGuard} from './unauth.guards';

export * from './auth.guards';
export * from './unauth.guards';

export const guards: any[] = [
  AuthGuard,
  UnauthGuard
];
