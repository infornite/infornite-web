import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ToggleSidebarModule } from '../sidebar/toggle-sidebar/toggle-sidebar.module';
import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { QuickAddComponent } from './quick-add/quick-add.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    UserPopupComponent,
    QuickAddComponent,
  ],
  imports: [
    CommonModule,
    ToggleSidebarModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    UserPopupComponent,
  ]
})
export class HeaderModule { }