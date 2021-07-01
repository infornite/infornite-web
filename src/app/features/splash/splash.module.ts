import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { SplashRoutingModule } from './splash-routing.module';
import { SplashComponent } from './splash/splash.component';
import { DemoComponent } from './demo/demo.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PricingComponent } from './pricing/pricing.component';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    SplashComponent,
    DemoComponent,
    AppointmentComponent,
    PricingComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    SharedModule,
    SplashRoutingModule
  ]
})
export class SplashModule { }