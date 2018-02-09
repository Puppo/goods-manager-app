import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'goods-add',
  template: `
  <button class="goods-add" mat-fab color="primary" (click)="onAdd()">
    <mat-icon aria-label="add button">add</mat-icon>
  </button>
  `,
  styleUrls: ['./goods-add.component.scss']
})
export class GoodsAddComponent {
  @Output() add: EventEmitter<void> = new EventEmitter<void>();

  onAdd(): void {
    this.add.emit();
  }
}
