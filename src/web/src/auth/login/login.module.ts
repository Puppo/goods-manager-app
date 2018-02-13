import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import * as fromContainers from './containers';

const ROUTES: Route[] = [{
  path: '',
  component: fromContainers.LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    ...fromContainers.containers
  ],
  exports: [
    ...fromContainers.containers
  ]
})
export class LoginModule { }
