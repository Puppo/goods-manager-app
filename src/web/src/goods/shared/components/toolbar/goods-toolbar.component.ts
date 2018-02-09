import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'goods-toolbar',
  template: `
    <mat-toolbar color="primary" class="goods-toolbar">
      <ng-content></ng-content>
      <span class="goods-toolbar__spacer"></span>
      <button mat-icon-button (click)="onTapExitApp()">
        <mat-icon class="goods-toolbar__icon">exit_to_app</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./goods-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsToolbarComponent {
  @Output() exitApp: EventEmitter<void> = new EventEmitter<void>();

  onTapExitApp() {
    this.exitApp.emit();
  }
}
