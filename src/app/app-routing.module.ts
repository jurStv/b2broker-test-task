import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-item',
    loadChildren: () => import('@app/feature-data-item').then(m => m.DataItemModule)
  },
  {
    path: '',
    redirectTo: 'data-item',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
