import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/core.module';
import { MatDialog } from '@angular/material/dialog';
import { routeAnimations, NotificationService } from '@core/core.module';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { SidebarService } from '../../services/sidebar.service';
import { FlatTreeControl } from '@angular/cdk/tree'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

//Graphql Support
import { FacetGQL, ConnectionGQL, FacetBreadcrumbGQL, FacetBreadcrumb, FacetTreeGQL, FacetTree } from '@app/graphql/schema'
import { FacetType} from '@app/graphql/schema'
import { Facet } from '@app/graphql/schema'
import { arrFacetDisplayFields, FacetDisplayFields } from '@gql/master'

interface FacetTreeChildren extends FacetTree {
  children: [FacetTreeChildren];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
}

@Component({
  selector: 'n4-facet-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [routeAnimations],
})
export class ViewComponent implements OnInit {

  //Facet
  facetType = FacetType;
  facet: Facet = {};
  facetDisplayFields: FacetDisplayFields;

  //Breadcrumb & Tree
  facetBreadcrumb: FacetBreadcrumb
  ultimateParentId: String;
  facetTree: FacetTreeChildren[]

  sidebarState: any

  showFiller = false;

  //General
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tabIndex: number = 0;
  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));

  //Tree
  private _transformer = (node: FacetTreeChildren, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  treeDS = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;


  constructor(
    private breakpointObserver: BreakpointObserver,
    public codeDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private facetGQL: FacetGQL,
    private facetBreadcrumbGQL: FacetBreadcrumbGQL,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private sidebarService: SidebarService,
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.loadFacet(params.id)
      this.setBreadcrumb(params.id)
      //this.setTree(params.id)

      this.sidebarService.showHamburger()
      this.sidebarState = this.sidebarService.sidebarStateObservable$

    })

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.tabIndex) {
        this.tabIndex = params.tabIndex;
      }
    })

    if (this.isSmallDevice$) {
      this.sidebarService.close()
    }
  }

  //Setting initial values
  loadFacet(paramsId) {
    this.facetGQL.fetch({
      filter: {
        id: paramsId
      }
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.facet = result.data.Facet[0]
          this.facetDisplayFields = arrFacetDisplayFields.find((f => f.facet === result.data.Facet[0].type)) ? arrFacetDisplayFields.find((f => f.facet === result.data.Facet[0].type)) : null;
        }
        else {
          this.notificationService.error('A matching facet was not found to display')
        }
      })
  }


  setBreadcrumb(paramsId) {
    this.facetBreadcrumbGQL.fetch({
      id: paramsId
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.facetBreadcrumb = JSON.parse(JSON.stringify(result.data.FacetBreadcrumb))
          this.ultimateParentId = null

          result.data.FacetBreadcrumb.forEach((item, index) => {
            if (item.type == FacetType.System && !this.ultimateParentId) {
              this.ultimateParentId = item.id
            }
          });
          if (!this.ultimateParentId) {
            result.data.FacetBreadcrumb.forEach((item, index) => {
              if (item.depth == 0) {
                this.ultimateParentId = item.id
              }
            })
          }
        }
      })
  }

  /*
  setTree(paramsId) {
    this.facetTreeGQL.fetch({
      id: paramsId
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.treeDS.data = ListToTree(JSON.parse(JSON.stringify(result.data.FacetTree)))
          console.log('Tree', this.treeDS.data)
        }
      })
  }
  */
}


