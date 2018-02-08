import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import * as fromShared from './shared';

const ROUTES: Route[] = [{
  path: 'auth',
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
      path: 'login',
      loadChildren: './login/login.module#AuthLoginModule',
      canActivate: [fromShared.UnauthGuard]
    }
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    fromShared.AuthSharedModule.forRoot(),
  ]
})
export class AuthModule { }
