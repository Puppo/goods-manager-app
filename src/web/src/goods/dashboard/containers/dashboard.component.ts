import { Component, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/store';
import * as fromRoute from '../../../app/store';
import * as fromStore from '../../store';
import { IGoods } from '../../models';

@Component({
  selector: 'goods-dashboard',
  template: `
    <goods-container class="goods-dashboard">
      <goods-toolbar class="header" (exitApp)="onExitApp()">
        Goods Manager Dashboard
      </goods-toolbar>

      <goods-section class="content">
        <goods-card *ngFor="let g of goods$ | async"
        [item]="g"
        (edit)="onEdit($event)"
        (delete)="onDelete($event)"></goods-card>
        <div class="goods-section__empty" *ngIf="!(goods$ | async).length">
          No items
        </div>
        <goods-add (add)="onAdd()"></goods-add>
      </goods-section>
    </goods-container>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  goods$ = this.store.select(fromStore.getStockGoodsSelector);

  constructor(
    protected store: Store<fromAuth.IAuthState | fromStore.IStockState>
  ) {}

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

  onEdit(goods: IGoods): void {
    this.store.dispatch(
      new fromRoute.Go({
        path: ['/goods', goods.$key]
      })
    );
  }

  onDelete(goods: IGoods): void {
    if (confirm('Are you sure?')) {
      const { $key } = goods;
      this.store.dispatch(new fromStore.GoodRemoveAction($key));
    }
  }
}
