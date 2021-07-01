import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFacetComponent } from './container/edit.component';

const routes: Routes = [
  {
    path: '',
    component: EditFacetComponent,
    //data: { title: 'n4.menu.splash' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule {}