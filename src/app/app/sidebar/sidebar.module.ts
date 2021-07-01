import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SharedModule } from '@shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SidebarModule { }