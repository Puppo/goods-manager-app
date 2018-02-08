import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import * as fromAuth from '../auth';

import * as fromShared from './shared';

const ROUTES: Route[] = [
  {
    path: 'goods',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#GoodsDashboardModule',
        canActivate: [fromAuth.AuthGuard]
      },
      {
        path: 'insert',
        loadChildren: './insert/insert.module#GoodsInsertModule',
        canActivate: [fromAuth.AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    fromShared.GoodsSharedModule.forRoot()
  ]
})
export class GoodsModule { }
