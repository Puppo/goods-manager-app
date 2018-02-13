import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import * as fromContainers from './containers';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GoodsSharedModule } from '../shared';

const ROUTES: Route[] = [
  {
    path: '',
    component: fromContainers.GoodsEntryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FlexLayoutModule,
    GoodsSharedModule
  ],
  declarations: [...fromContainers.containers],
  exports: [...fromContainers.containers]
})
export class EntryModule {}
