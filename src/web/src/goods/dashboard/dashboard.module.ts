import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { GoodsSharedModule } from '../shared';
import * as fromContainers from './containers';

const ROUTES: Route[] = [{
  path: '',
  component: fromContainers.DashboardComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    GoodsSharedModule
  ],
  declarations: [
    ...fromContainers.Containers
  ],
  exports: [
    ...fromContainers.Containers
  ]
})
export class GoodsDashboardModule { }
