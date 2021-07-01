import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { DemoComponent } from './demo/demo.component';
import { AppointmentComponent } from './appointment/appointment.component'

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplashRoutingModule { }
