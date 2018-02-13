import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { IGoods } from '../../../models';

@Component({
  selector: 'goods-card',
  template: `
  <mat-card class="goods-card">
    <mat-card-header>
      <mat-card-title>{{ item.title }}</mat-card-title>
      <mat-card-subtitle>{{ item.subtitle }}</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image
        [src]="item.images"
        [alt]="item.title"
        onerror="this.src='https://dummyimage.com/200x200/ffffff/000000.png&text=empty'">
    <mat-card-content>
      <p>{{ item.description }}</p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-icon-button (click)="onEdit()">
        <mat-icon aria-label="edit button">edit</mat-icon>
      </button>
      <button mat-icon-button (click)="onDelete()">
        <mat-icon aria-label="delete button">delete</mat-icon>
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styleUrls: ['./goods-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsCardComponent {
  @Input() item: IGoods;

  @Output() edit: EventEmitter<IGoods> = new EventEmitter<IGoods>();
  @Output() delete: EventEmitter<IGoods> = new EventEmitter<IGoods>();

  onEdit(): void {
    this.edit.emit(this.item);
  }

  onDelete(): void {
    this.delete.emit(this.item);
  }
}
