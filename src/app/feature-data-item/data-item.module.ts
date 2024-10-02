import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { DataTableComponent, SettingsControlGroupComponent } from '@app/feature-data-item/components';
import { DataContainerComponent } from '@app/feature-data-item/containers';
import { DataPageComponent } from '@app/feature-data-item/pages';

import { DataItemRoutingModule } from './data-item-routing.module';

@NgModule({
  declarations: [
    DataTableComponent,
    SettingsControlGroupComponent,
    DataContainerComponent,
    DataPageComponent
  ],
  imports: [
    SharedModule,
    DataItemRoutingModule,
  ],
  bootstrap: [],
})
export class DataItemModule { }
