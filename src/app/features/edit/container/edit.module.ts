import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import {  RouterModule } from '@angular/router' 

import { EditFacetComponent } from './edit.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    EditFacetComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    RouterModule,
    TagInputModule
  ]
})
export class PersonFormModule {
  
}
