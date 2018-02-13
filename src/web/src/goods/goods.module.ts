import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatSnackBarModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAuth from '../auth';

import * as fromShared from './shared';
import { reducers, effects } from './store';

const ROUTES: Route[] = [
  {
    path: 'goods',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [fromAuth.AuthGuard]
      },
      {
        path: 'insert',
        loadChildren: './entry/entry.module#EntryModule',
        canActivate: [fromAuth.AuthGuard]
      },
      {
        path: ':id',
        loadChildren: './entry/entry.module#EntryModule',
        canActivate: [fromAuth.AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('stock', reducers),
    EffectsModule.forFeature(effects),
    fromShared.GoodsSharedModule.forRoot(),
  ]
})
export class GoodsModule {}
