import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { CoreModule } from './core/core.module';
//import { NavbarComponent } from './app/navbar/nabar.component';
//import { UserPopupComponent } from './app/navbar/user-popup/user-popup.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { SidebarModule } from '@app/app/sidebar/sidebar.module';
import { HeaderModule } from '@app/app/header/header.module';
import { FooterModule } from '@app/app/footer/footer.module';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AUTH_CONFIG } from '@core/auth/auth.config'

import { HIGHLIGHT_OPTIONS, HighlightModule } from "ngx-highlightjs";

function getHighlightLanguages() {
  return {
    javascript: () => import('highlight.js/lib/languages/javascript'),
    json: () => import('highlight.js/lib/languages/json'),
    plaintext: () => import('highlight.js/lib/languages/plaintext'),
    python: () => import('highlight.js/lib/languages/python'),
    sql: () => import('highlight.js/lib/languages/sql'),
    xml: () => import('highlight.js/lib/languages/xml'),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    //NavbarComponent,
    //UserPopupComponent,
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,

    //recaptcha
    RecaptchaV3Module,

    SidebarModule,
    HeaderModule,
    FooterModule,

    AuthModule.forRoot({
      domain: 'n4nite.au.auth0.com',
      clientId: 'darJqhxkzy0hi6PUQTCAWKFlH7hO2a8w',
      audience:'https://api.n4nite.com/',
      redirectUri: AUTH_CONFIG.REDIRECT,
    }),

    //HighlightModule,

  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LfyDD8aAAAAAP1VR_2RdlS0Ev05sR1dAbwc-kBM" }, {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbers: false,
      languages: getHighlightLanguages()
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

