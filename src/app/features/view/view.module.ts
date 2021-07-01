import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ViewRoutingModule } from './view-routing.module';

import { ViewComponent } from './view.component';
import { ViewConnectionComponent } from './connections/connection.component';

import { FormsModule } from '@angular/forms';
import {FacetTreeComponent} from './tree/facet-tree.component'
import {MatSidenavModule} from '@core/core.module'

@NgModule({
  declarations: [
    ViewComponent,
    ViewConnectionComponent,
    FacetTreeComponent
    ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    FormsModule,
    MatSidenavModule,
  ]
})
export class ViewModule { }