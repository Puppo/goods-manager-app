import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'goods-container',
  template: `
    <div class="goods-container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: [
    './goods-container.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class GoodsContainerComponent {

}
