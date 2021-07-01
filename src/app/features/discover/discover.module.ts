import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DiscoverComponent } from './discover/discover.component';
import { DiscoverRoutingModule } from './discover-routing.module';
@NgModule({
  declarations: [DiscoverComponent],
  imports: [CommonModule, SharedModule, DiscoverRoutingModule]
})
export class DiscoverModule {}
