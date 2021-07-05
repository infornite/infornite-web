import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { HeaderItem } from './header-item'
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { SidebarService } from '../../services/sidebar.service';
import { UpsertFacetGQL, FacetStubGQL, CreateConnectionGQL, DeleteConnectionGQL, ConnectionGQL, ConnectionDocument, FacetSnippetDocument, Connection, } from '@app/graphql/schema'
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import {
  routeAnimations,
  LocalStorageService,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../../core/core.module';

import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../../core/settings/settings.actions';
import { uptime } from 'process';
import { debounceTime, filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FacetType } from '@app/graphql/schema';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '300px' })),
      state('false', style({ width: '0' })),
      transition('true => false', animate('300ms ease-in')),
      transition('false => true', animate('300ms ease-out'))
    ])
  ],

})
export class HeaderComponent implements OnInit {
  @Input() isSmallDevice: boolean;

  @ViewChild('input') inputElement: ElementRef;
  baseDomain: String
  loginString: String
  hamburgerState: any
  showSearch: boolean = false;
  navbarItems: HeaderItem[] = [
    {
      label: 'Disover',
      icon: 'home',
      routerLink: 'discover',
      linkActive: 'active',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Explore',
      icon: 'explore',
      routerLink: 'explore',
      linkActive: 'active',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }
  ];

  //Search
  private readonly unsubscribe = new Subject<void>();
  searchPlaceholder: String = ""
  acSearchIsLoading = false;
  acSearchFilteredFacets: any;

  searchVisible = false;

  searchForm = new FormGroup({
    searchInput: new FormControl('',),

  });

  constructor(
    public auth: AuthService,
    private sidebarService: SidebarService,
    private facetStubGQL: FacetStubGQL,
    private router: Router,
  ) { }

  ngOnInit() {
    this.baseDomain = location.origin
    this.sidebarService.showHamburger()
    this.hamburgerState = this.sidebarService.hamburgerStateObservable$
    this.acSearchAssign()
}




  get searchInput() { return this.searchForm.get('searchInput') }

  _acSearchAssign() {
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((value) => {
          if (!value || value.length < 2) {
            this.acSearchFilteredFacets = []
          }
        }),
        filter(value => value && value.length >= 2),
        debounceTime(100),
        tap(() => {
          this.acSearchFilteredFacets = [];
          this.acSearchIsLoading = true;
        }),
        switchMap(value =>
          this.facetStubGQL.fetch({
            filter: {
              name: value,
              type: []
            }
          }))).subscribe((result) => {
            this.acSearchIsLoading = false;
            if (result == undefined) {
              this.acSearchFilteredFacets = [];
            } else {
              this.acSearchFilteredFacets = result.data.FacetStub;
            }
          });
  }

  acSearchAssign(){
    this.searchInput.valueChanges
    .pipe(
      tap((value) => {
        if (!value || value.length < 3) {
          this.acSearchFilteredFacets = []
        }
      }),
      filter(value => value && value.length >= 3),
      debounceTime(500),
      tap(() => {
        this.acSearchFilteredFacets = [];
        this.acSearchIsLoading = true;
      }),
      switchMap(value => 
        this.facetStubGQL.fetch({
          filter: {
            name: value,
            type: []
          }
        })
        .pipe(
          finalize(() => {
            this.acSearchIsLoading = false
          }),
        )
      )
    )
    .subscribe(data => {data
      console.log(data['data']['FacetStub'])
      if (data['data']['FacetStub'] == undefined) {
        this.acSearchFilteredFacets = [];
      } else {
        this.acSearchFilteredFacets = data['data']['FacetStub'];
      }
    });
}

  getACDisplayValue(option) {
    return option ? option.name : '';
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  search() {
    if (this.searchVisible && this.searchInput.value.length > 3) {
      this.router.navigate(['/discover', this.searchInput.value])
      this.searchForm.get('searchInput').setValue("")
      this.searchVisible = false;
    }
    else {
      this.searchVisible = !this.searchVisible
      this.inputElement.nativeElement.focus();
    }
  }

  acItemSelected(id, name, type) {

    if (this.router.url.includes('explore')) {
      this.router.navigate(['/explore', id])
      this.searchForm.get('searchInput').setValue("")
      this.searchVisible = false;
    }
    else {
      this.router.navigate(['/view', id])
      this.searchForm.get('searchInput').setValue("")
      this.searchVisible = false;
    }
  }

  searchFocusOut() {
    if (this.searchVisible && this.searchInput.value.length == 0) {
      this.searchVisible = false
    }

  }
}
