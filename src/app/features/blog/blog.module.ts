import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }