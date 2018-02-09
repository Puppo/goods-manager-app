import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import * as fromComponents from './components';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule
  ],
  declarations: [...fromComponents.Components],
  exports: [...fromComponents.Components]
})
export class GoodsSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GoodsSharedModule,
      providers: []
    };
  }
}
