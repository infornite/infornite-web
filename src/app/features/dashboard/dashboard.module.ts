import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BarChartComponent} from './bar-chart/bar-chart.component'
import { KpiCardComponent } from './kpi-card/kpi-card.component'
import {MatSidenavModule} from '@core/core.module'


@NgModule({
  declarations: [
    DashboardComponent, 
    BarChartComponent,
    KpiCardComponent    
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule
  ]
})
export class DashboardModule { }