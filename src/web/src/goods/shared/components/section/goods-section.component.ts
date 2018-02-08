import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'goods-section',
  template: `
    <div class="goods-section">
      <ng-content selector="h1"></ng-content>
      <ng-content selector="div.content"></ng-content>
    </div>
  `,
  styleUrls: [
    './goods-section.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class GoodsSectionComponent {

}
