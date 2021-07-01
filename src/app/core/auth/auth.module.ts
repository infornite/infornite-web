import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallbackComponent } from './callback.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    //EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [ CallbackComponent],
  entryComponents: []
})
export class AuthModule {}