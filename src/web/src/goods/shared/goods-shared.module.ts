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
import * as fromServices from './services';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class GoodsSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GoodsSharedModule,
      providers: [...fromServices.services]
    };
  }
}
