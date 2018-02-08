import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'goods-toolbar',
  template: `
    <mat-toolbar color="primary" class="goods-toolbar">
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styleUrls: [
    './goods-toolbar.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class GoodsToolbarComponent { }
