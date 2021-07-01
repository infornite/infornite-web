import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { environment as env } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { SidebarService } from '../services/sidebar.service';
import { mainContentAnimation } from '@core/animations/sidebar.animations';
import { DEFAULT_BREAKPOINTS } from "@angular/flex-layout";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

import {
  routeAnimations,
  LocalStorageService,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme,
  selectDiscoverFacetTab,
} from '@core/core.module';

import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '@core/settings/settings.actions';

@Component({
  selector: 'n4-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations, mainContentAnimation()]
})
export class AppComponent implements OnInit {
  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));
  sidebarState: boolean;
  isProd = env.production;
  envName = env.envName;
  version = '1';//env.versions.app;
  year = new Date().getFullYear();
  //logo = require('../../assets/logo.png').default;
  languages = ['en','fr'];
  navigation = [
    { link: 'about', label: 'n4.menu.about' },
    { link: 'feature-list', label: 'n4.menu.features' },
    { link: 'examples', label: 'n4.menu.examples' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'n4.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  selectDiscoverFacetTab$: Observable<boolean>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private storageService: LocalStorageService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public auth: AuthService,
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
  ) {
    this.matIconRegistry.addSvgIcon('infornite',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/logo.svg'));
    this.matIconRegistry.addSvgIcon('sad-face',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/sad-face.svg'));
    this.matIconRegistry.addSvgIcon('happy-face',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/happy-face.svg'));
    this.matIconRegistry.addSvgIcon('sad-face-plain',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/sad-face-plain.svg'));
    this.matIconRegistry.addSvgIcon('happy-face-plain',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/happy-face-plain.svg'));
    this.matIconRegistry.addSvgIcon('knowledge-area',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/knowledge-area.svg'));
    this.matIconRegistry.addSvgIcon('element',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/element.svg'));
    this.matIconRegistry.addSvgIcon('report',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/report.svg'));
    this.matIconRegistry.addSvgIcon('stakeholder',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/stakeholder.svg'));
    this.matIconRegistry.addSvgIcon('system',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/system.svg'));
    this.matIconRegistry.addSvgIcon('control',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/control.svg'));
    this.matIconRegistry.addSvgIcon('business-area',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/business-area.svg'));
    this.matIconRegistry.addSvgIcon('artefact',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/artefact.svg'));
    this.matIconRegistry.addSvgIcon('table',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/table.svg'));
    this.matIconRegistry.addSvgIcon('attribute',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/attribute.svg'));
    this.matIconRegistry.addSvgIcon('sorry',this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/img/icons/sorry.svg'));

  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.auth.getAccessTokenSilently()

    //this.auth.localAuthSetup();
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }



    this.sidebarService.sidebarStateObservable$
    .subscribe((newState: boolean) => {
      this.sidebarState = newState;
    });

    //this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.selectDiscoverFacetTab$ = this.store.pipe(select(selectDiscoverFacetTab));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));

  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}




