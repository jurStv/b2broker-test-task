import { APP_BASE_HREF } from '@angular/common';
import {
  TRANSLOCO_LOADER,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig
} from '@ngneat/transloco';
import { Injectable, NgModule, Inject } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { environment } from '@app/env';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref: string,
  ) {}

  getTranslation(lang: string) {
    return this.http.get(`${this.baseHref}assets/i18n/${lang}.json`)
  }
}

@NgModule({
  imports: [
    TranslocoModule
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}
