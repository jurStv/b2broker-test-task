import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataPageComponent } from '@app/feature-data-item/pages';

const routes: Routes = [
  {
    path: '',
    component: DataPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataItemRoutingModule { }
