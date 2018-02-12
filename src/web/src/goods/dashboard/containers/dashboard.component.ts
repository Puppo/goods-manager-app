import { Component, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/store';
import * as fromRoute from '../../../app/store';

@Component({
  selector: 'goods-dashboard',
  template: `
    <goods-container class="goods-dashboard">
      <goods-toolbar class="header" (exitApp)="onExitApp()">
        Goods Manager Dashboard
      </goods-toolbar>

      <goods-section class="content">
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-card (edit)="onEdit($event)"></goods-card>
        <goods-add (add)="onAdd()"></goods-add>
      </goods-section>
    </goods-container>
  `,
  styleUrls: [
    './dashboard.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

  constructor(
    protected store: Store<fromAuth.IAuthState>) {}

  onExitApp(): void {
    this.store.dispatch(new fromAuth.AuthLogout());
  }

  onAdd(): void {
    this.store.dispatch(
      new fromRoute.Go({
        path: ['/goods/insert']
      })
    );
  }

  onEdit(goods: any): void {
    this.store.dispatch(
      new fromRoute.Go({
        path: ['/goods', goods.id]
      })
    );
  }

}
