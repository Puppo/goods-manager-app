import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'goods-dashboard',
  template: `
    <goods-container class="goods-dashboard">
      <goods-toolbar class="header">
        Goods Manager Dashboard
      </goods-toolbar>

      <goods-section class="content">
        <goods-card></goods-card>
        <goods-card></goods-card>
        <goods-card></goods-card>
        <goods-card></goods-card>
        <goods-card></goods-card>
        <goods-card></goods-card>
        <goods-card></goods-card>
        <goods-card></goods-card>
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

  constructor(protected router: Router) {}

  onAdd(): void {
    this.router.navigate(['/goods/insert']);
  }

}
