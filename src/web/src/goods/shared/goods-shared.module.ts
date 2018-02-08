import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import * as fromContainers from './components';
// import * as fromServices from './services';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [...fromContainers.Components],
  exports: [...fromContainers.Components]
})
export class GoodsSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GoodsSharedModule,
      providers: []
    };
  }
}
