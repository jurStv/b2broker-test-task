import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslocoModule } from '@ngneat/transloco';

import { DefaultToPipe, KeysPipe } from './pipes';

const NG_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslocoModule,
];

const PIPES = [
  DefaultToPipe,
  KeysPipe
];

@NgModule({
  imports: [
    ...NG_MODULES
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...NG_MODULES,
    ...PIPES
  ]
})
export class SharedModule {}
