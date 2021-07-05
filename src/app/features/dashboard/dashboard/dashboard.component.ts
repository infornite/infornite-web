import { Component, OnInit } from '@angular/core';
import { DashboardFacets, DashboardFacetsGQL } from '@app/graphql/schema'
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  facetTypeLabel: String = "Facet Types"
  facetTypeLabels: String[] = []
  facetTypeData: Number[] = []

  constructor(
    private dashboardFacetsGQL: DashboardFacetsGQL
  ) { }

  ngOnInit(): void {
    this.loadDashboardFacets()
  }

  loadDashboardFacets() {
    this.dashboardFacetsGQL.fetch()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {

          var resReduced = Object.values(result.data.DashboardFacets.reduce((r, o) => (r[o.type]
            ? (r[o.type].count += o.count)
            : (r[o.type] = { ...o }), r), {}));

          var res = resReduced.sort(this.compareCounts)

          this.facetTypeLabels = []
          this.facetTypeData = []

          res.forEach(element => {
            // @ts-ignore
            this.facetTypeLabels.push(element.type.replace(/_/g, " "))
            // @ts-ignore
            this.facetTypeData.push(element.count)
          });
        }
        else {
          //
        }
      })
  }

compareCounts( a, b ) {
    if ( a.count > b.count ){
      return -1;
    }
    if ( a.count < b.count ){
      return 1;
    }
    return 0;
  }
}
