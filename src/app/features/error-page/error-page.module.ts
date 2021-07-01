import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ErrorPageRoutingModule
  ]
})
export class ErrorPageModule { }