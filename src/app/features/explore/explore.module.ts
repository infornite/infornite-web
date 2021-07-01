import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore/explore.component';
import {MatSidenavModule} from '@core/core.module'
import {N4CytoComponent} from './n4-cyto/n4-cyto.component'

@NgModule({
  declarations: [
    ExploreComponent,
    N4CytoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExploreRoutingModule,
    MatSidenavModule
  ],
  exports:[
    N4CytoComponent
  ]
})
export class ExploreModule { }