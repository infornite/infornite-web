import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/core.module';
import { routeAnimations, NotificationService } from '@core/core.module';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SidebarService } from '../../../services/sidebar.service';
import { MediaObserver } from '@angular/flex-layout';
//Schema
import { arrFacetType, arrFacetStatus } from '../../../graphql/master'
import { ActivatedRoute, Router } from '@angular/router';
//Graphql Support
import { FacetSearchGQL } from '@app/graphql/schema'
import { FacetSearch, QueryFacetSearchInput } from '@app/graphql/schema'
import { _Ordering } from '@app/graphql/schema'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { selectDiscoverFilterPanel } from '@core/core.module';
import { actionSettingsChangeDiscoverFilterPanel } from '../../../core/settings/settings.actions';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'n4-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoverComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  selectDiscoverFilterPanel$: Observable<boolean>;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  searchValue: string

  showFilters: boolean = false
  showFiltersText: string = "Show Filters"
  resultsLoading: boolean;
  defaultResultsSize: number = 200;
  firstLoadComplete: boolean = false;

  //Schema
  arrFacetType = arrFacetType
  arrFacetStatus = arrFacetStatus
  searchResults: FacetSearch[] = []
  orderBy = _Ordering
  searchCriteria: QueryFacetSearchInput = {
    search: null,
    attributes: null,
    name: null,
    type: null,
    subType: null,
    status: null,
    first: this.defaultResultsSize,
    offset: null,
    orderBy: [_Ordering.UpdatedAtDesc]
  }

  x: boolean

  dataSource: MatTableDataSource<FacetSearch> = new MatTableDataSource<FacetSearch>(this.searchResults);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private facetSearchGQL: FacetSearchGQL,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private sidebarService: SidebarService,
    public media: MediaObserver,
    private activatedRoute: ActivatedRoute,
  ) { }

  public handlePageBottom(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
  }

  ngOnInit() {
    this.media.isActive
    this.sidebarService.hideHamburger()
    this.selectDiscoverFilterPanel$ = this.store.pipe(select(selectDiscoverFilterPanel));
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

    this.activatedRoute.params.subscribe(params => {
      if (params.search) {
        this.searchValue = params.search
        this.submitSearch(params.search)
      }
      else {
        this.runSearch(this.searchCriteria)
      }
    })
  }

  ngAfterViewInit(){
    this.firstLoadComplete = true;
  }

  submitSearch(searchString: string) {
    this.searchCriteria.search = null
    this.searchCriteria.attributes = null

    //Atribute/Element --> Table or Report
    if (searchString.startsWith('[') && searchString.match(/\[/g).length == 1 && searchString.endsWith(']') && searchString.match(/]/g).length == 1) {
      var attributes = this.replaceAll(searchString," ",",").replace("[", "")
        .replace("]", "")
        .split(',')
        .filter(function (el) {
          return el != null;
        });

      attributes.forEach((name, index) => attributes[index] = `%${name.replace(/[\W_]+/g, '')}%`);

      this.searchCriteria.attributes = attributes
    }
    else (
      this.searchCriteria.search = searchString.replace(/\s/g, ' <-> ') + ':*'
    )

    this.runSearch(this.searchCriteria)
  }

  replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }


  toggleShowFilters() {
    this.showFilters = !this.showFilters
    this.showFiltersText = (this.showFiltersText == "Show Filters") ? "Save Filters" : "Show Filters"
  }

  runSearch(searchCriteria: QueryFacetSearchInput) {
    this.resultsLoading = true;
    this.facetSearchGQL.fetch({
      filter: searchCriteria
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          //this.facetId = result.data.Facet[0].id;
          this.searchResults = result.data.FacetSearch
          this.dataSource.data = result.data.FacetSearch
          this.resultsLoading = false;
        }
        else {
          this.notificationService.error('A matching facet was not found to edit')
          this.resultsLoading = false;
        }
      })
  }

  //Search filters functionality
  toggleFilterPanel(value) {
    this.store.dispatch(actionSettingsChangeDiscoverFilterPanel({ discoverFilterPanel: value.checked }));
  }

  searchFilterOrderBy(orderBy) {
    this.searchCriteria.orderBy = [orderBy]
    this.runSearch(this.searchCriteria)
  }

  searchFilterType(facetType) {
    this.searchCriteria.type = []

    for (var i = 0, iLen = facetType.length; i < iLen; i++) {
      var opt = facetType[i];

      if (opt.selected) {
        this.searchCriteria.type.push(opt.value);
      }
    }

    this.runSearch(this.searchCriteria)
  }

  searchFilterStatus(status) {
    this.searchCriteria.status = []

    for (var i = 0, iLen = status.length; i < iLen; i++) {
      var opt = status[i];

      if (opt.selected) {
        this.searchCriteria.status.push(opt.value);
      }
    }

    this.runSearch(this.searchCriteria)
  }



  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}


