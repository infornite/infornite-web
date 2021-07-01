import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Input, AfterViewInit, OnChanges } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/core.module';
import { routeAnimations, NotificationService } from '@core/core.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, take } from 'rxjs/operators';
//Graphql Support
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Facet } from '@app/graphql/schema'
import { Observable } from 'rxjs';
import { options } from 'marked';
import { FormControl } from '@angular/forms';

import { ConnectionGQL } from '@app/graphql/schema'
import { Connection } from '@app/graphql/schema'
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'n4-view-connections',
  templateUrl: './connection.component.html',
  styleUrls: ['../view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [routeAnimations],
})
export class ViewConnectionComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() facetId: string;
  @ViewChild(MatSort) set matSort(ms: MatSort) { this.sort = ms; }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; this.setDataSourceAttributes(); }

  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));

  showTable: Boolean = false;
  resultsLoading: boolean;
  chipControl = new FormControl(new Set());
  groupConnectionsByType: any;
  paginator: MatPaginator;
  sort: MatSort;
  displayedColumns: string[] = ['fromName', 'fromType', 'display', 'toType', 'toName'];
  displayedColumnsSmallDevice: string[] = ['display', 'toName'];
  dataSource: MatTableDataSource<Connection> = new MatTableDataSource();

  constructor(
    private connectionGQL: ConnectionGQL,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
  ) { }


  ngOnInit() {
    this.dataSource.data = []
  }

  ngAfterViewInit() {
    this.loadConnections()
    
  }

  ngOnChanges() {
    this.loadConnections()    
}

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadConnections() {
    this.changeDetectorRef.detectChanges()
    this.resultsLoading = true;
    this.connectionGQL.fetch({
      filter: {
        facetId: this.facetId,
      }
    },
      {
        fetchPolicy: "cache-first"
      }
    )
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {

          //this.facetConnections = result.data.Connection
          this.dataSource.data = result.data.Connection
          this.setDataSourceAttributes()


          this.dataSource.filterPredicate = (data: Connection, filter: string) => {
            return !filter || this.chips.has(data.targetType)
          }

          this.groupConnectionsByType = this.dataSource.data.reduce((acc, it) => {
            acc[it.targetType] = acc[it.targetType] + 1 || 1;
            return acc;
          }, {});


          this.resultsLoading = false;
        }
        else {
          this.resultsLoading = false;
        }
      })
  }


  public handlePageBottom(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
  }
  // Connections Table
  toggleConnectionTable() {
    this.showTable = !this.showTable
  }
  toggleChip(type: string, event: any) {
    const addChip = () => { this.chips.add(type); };
    const removeChip = () => { this.chips.delete(type); };
    this.chips.has(type) ? removeChip() : addChip();

    if (this.chips.size > 0) {
      this.dataSource.filter = "filter"
    }
    else {
      this.dataSource.filter = null
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get chips() {
    return this.chipControl.value;
  }
}


