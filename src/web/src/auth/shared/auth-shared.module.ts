import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromGuards from './guards';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class AuthSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthSharedModule,
      providers: [
        ...fromGuards.Guards,
        ...fromServices.Services
      ]
    };
  }
}
