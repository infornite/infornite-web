import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { AuthGuardService } from '../app/core/auth/auth-guard.service';
import { InterceptorService } from '@auth/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/splash/splash.module').then((m) => m.SplashModule)
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./features/splash/splash.module').then((m) => m.SplashModule)
  },
  {
    path: 'discover',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/discover/discover.module').then((m) => m.DiscoverModule)
  },
  {
    path: 'explore',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/explore/explore.module').then((m) => m.ExploreModule)
  },
  {
    path: 'explore/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/explore/explore.module').then((m) => m.ExploreModule)
  },
  {
    path: 'view/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/view/view.module').then((m) => m.ViewModule)
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/edit/edit.module').then((m) => m.FacetEditModule)
  },
  {
    path: 'create/:type',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/edit/edit.module').then((m) => m.FacetEditModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      )
  },
  /*
  {
    path: '**',
    redirectTo: 'splash'
  }
  */
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule],
  //Providers added specifically for the interceptor service
  /*
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
  */
})
export class AppRoutingModule {}
