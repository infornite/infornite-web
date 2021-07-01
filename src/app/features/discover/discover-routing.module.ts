import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverComponent } from './discover/discover.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
    //data: { title: 'n4.menu.splash' }
  },
  {
    path: ':search',
    component: DiscoverComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverRoutingModule {}