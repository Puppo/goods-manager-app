import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'goods-card',
  template: `
  <mat-card class="goods-card">
    <mat-card-header>
      <mat-card-title>Shiba Inu</mat-card-title>
      <mat-card-subtitle>Dog Breed</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image src="http://lorempixel.com/400/200/food/" alt="Photo of a Shiba Inu">
    <mat-card-content>
      <p>
        The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-mini-fab color="primary" (click)="onEdit()">
        <mat-icon aria-label="edit button">edit</mat-icon>
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styleUrls: [
    './goods-card.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class GoodsCardComponent {
  @Input()
  item: any;

  @Output()
  edit: EventEmitter<any> = new EventEmitter<any>();

  onEdit(): void {
    this.edit.emit(this.item);
  }

}
