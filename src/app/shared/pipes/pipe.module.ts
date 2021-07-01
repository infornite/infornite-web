import { NgModule } from '@angular/core';
import { ReplaceUnderscorePipe } from './replaceUnderscore.pipe'
import {LowerCaseWithDashesPipe} from './lcWithDashes'

@NgModule({
  declarations: [
    ReplaceUnderscorePipe,
    LowerCaseWithDashesPipe
  ],
  imports: [
  ],
  exports: [
    ReplaceUnderscorePipe,
    LowerCaseWithDashesPipe
  ]
})
export class PipesModule { }