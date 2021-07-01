import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { EditRoutingModule } from './edit-routing.module';
import { EditFacetComponent } from './container/edit.component';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    EditFacetComponent
    ],
  imports: [
    CommonModule,
    EditRoutingModule,
    SharedModule,
    FormsModule,
    TagInputModule,
  ]
})
export class FacetEditModule { }
