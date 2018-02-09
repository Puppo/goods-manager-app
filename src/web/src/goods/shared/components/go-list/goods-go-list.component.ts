import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'goods-go-list',
  template: `
  <button class="goods-go-list" mat-fab color="primary" (click)="onTap()">
    <mat-icon aria-label="add button">list</mat-icon>
  </button>
  `,
  styleUrls: ['./goods-go-list.component.scss']
})
export class GoodsGoListComponent {
  @Output() goList: EventEmitter<void> = new EventEmitter<void>();

  onTap(): void {
    this.goList.emit();
  }
}
