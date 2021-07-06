import { Component, OnInit } from '@angular/core';
import { DashboardFacets, DashboardFacetsGQL, QueryDashboardFacetsInput, DashboardKpisGQL, DashboardKpis } from '@app/graphql/schema'
import { map, take } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/core.module';
import { routeAnimations, NotificationService } from '@core/core.module';
import { arrFacetType, arrFacetStatus } from '../../../graphql/master'
import { SidebarService } from '../../../services/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routeAnimations],
})
export class DashboardComponent implements OnInit {

  facetTypeLabel: String = "Facet Types"
  facetTypeLabels: String[] = []
  facetTypeData: Number[] = []
  facetTypeColors: String[] =['#1170aa', '#fc7d0b', '#a3acb9', '#57606c', '#5fa2ce', '#c85200', '#7b848f', '#a3cce9', '#ffbc79', '#c8d0d9']// ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6', '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6']
  
  facetSubTypeLabel: String = "Facet Subtypes"
  facetSubTypeLabels: String[] = []
  facetSubTypeData: Number[] = []
  facetSubTypeColors: String[] = ['#466f9d', '#91b3d7', '#ed444a', '#feb5a2', '#9d7660', '#d7b5a6', '#3896c4', '#a0d4ee', '#ba7e45', '#39b87f', '#c8133b', '#ea8783']

  kpis: DashboardKpis[]

  filterCriteria: QueryDashboardFacetsInput = {
    type: null,
    status: null,
  }
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  arrFacetType = arrFacetType
  arrFacetStatus = arrFacetStatus

  sidebarState: any

  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));

  constructor(
    private dashboardFacetsGQL: DashboardFacetsGQL,
    private dashboardKpisGQL: DashboardKpisGQL,
    private sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.loadDashboardFacets()
    this.loadDashboardKpis()
    this.sidebarService.showHamburger()
    this.sidebarState = this.sidebarService.sidebarStateObservable$
  }

  searchFilterStatus(status) {
    this.filterCriteria.status = []

    for (var i = 0, iLen = status.length; i < iLen; i++) {
      var opt = status[i];

      if (opt.selected) {
        this.filterCriteria.status.push(opt.value);
      }
    }

    this.loadDashboardFacets()
    this.loadDashboardKpis()
  }

  searchFilterType(facetType) {
    this.filterCriteria.type = []
    for (var i = 0, iLen = facetType.length; i < iLen; i++) {
      var opt = facetType[i];

      if (opt.selected) {
        this.filterCriteria.type.push(opt.value);
      }
    }
    this.loadDashboardFacets()
    this.loadDashboardKpis()
  }

  loadDashboardFacets() {
    this.dashboardFacetsGQL.fetch({
      filter: this.filterCriteria
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {

          var resTypeReduced = Object.values(result.data.DashboardFacets.reduce((r, o) => (r[o.type]
            ? (r[o.type].count += o.count)
            : (r[o.type] = { ...o }), r), {}));

          var resSubTypeReduced = Object.values(result.data.DashboardFacets.reduce((r, o) => (r[o.type]
            ? (r[o.subType].count += o.count)
            : (r[o.subType] = { ...o }), r), {}));

          var resType = resTypeReduced.sort(this.compareCounts)
          var resSubType = resSubTypeReduced.sort(this.compareCounts)

          this.facetTypeLabels = []
          this.facetTypeData = []
          this.facetSubTypeLabels = []
          this.facetSubTypeData = []

          resType.forEach(element => {
            // @ts-ignore
            this.facetTypeLabels.push(element.type.replace(/_/g, " "))
            // @ts-ignore
            this.facetTypeData.push(element.count)
          });

          resSubType.forEach(element => {
            // @ts-ignore
            this.facetSubTypeLabels.push(element.subType.replace(/_/g, " "))
            // @ts-ignore
            this.facetSubTypeData.push(element.count)
          });

        }
        else {
          //
        }
      })
  }

  loadDashboardKpis() {
    this.dashboardKpisGQL.fetch({
      filter: this.filterCriteria
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.kpis = result.data.DashboardKpis
        }
        else {
          //
        }
      })
  }

  compareCounts(a, b) {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    return 0;
  }
}
