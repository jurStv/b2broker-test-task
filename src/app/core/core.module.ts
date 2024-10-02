import { NgModule } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

import { environment, Environment } from '@app/env';
import { NATIVE_STORAGE_TOKEN } from '@app/shared/services';

import { TranslocoRootModule } from './transloco-root.module';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  imports: [
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: Environment,
      useValue: environment,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
    {
      provide: NATIVE_STORAGE_TOKEN,
      useValue: localStorage,
    },
  ]
})
export class CoreModule {}
