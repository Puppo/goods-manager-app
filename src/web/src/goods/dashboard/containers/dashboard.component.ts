import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/shared/services/auth';

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
    protected router: Router,
    protected auth: AuthService) {}

  onExitApp(): void {
    this.auth.signOut();
    this.router.navigate(['auth']);
  }

  onAdd(): void {
    this.router.navigate(['/goods/insert']);
  }

  onEdit(goods: any): void {
    this.router.navigate(['/goods', goods.id]);
  }

}
