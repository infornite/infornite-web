import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { UpsertFacetGQL, FacetGQL, ConnectionGQL, CreateConnectionDocument, CreateConnectionGQL, FacetBreadcrumbGQL, FacetBreadcrumb, FacetTreeGQL, FacetTree } from '@app/graphql/schema'
import { FlatTreeControl } from '@angular/cdk/tree'
import { ListToTree } from '@shared/utility/listToTree'
import { SidebarService } from '../../../services/sidebar.service';
import { map, take } from 'rxjs/operators';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
interface FacetTreeChildren extends FacetTree {
  children: [FacetTreeChildren];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
  type: string
}

@Component({
  selector: 'facet-tree',
  templateUrl: './facet-tree.component.html',
  styleUrls: ['./facet-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FacetTreeComponent implements OnChanges {
  @Input() ultimateFacetId: string;
  @Input() facetId: string;
  facetTree: FacetTreeChildren[]
  loading:Boolean=true;

  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));

  constructor(
    private facetTreeGQL: FacetTreeGQL,
    private sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver,
  ) { }

   //Tree
   private _transformer = (node: FacetTreeChildren, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
      type: node.type
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  treeDS = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;


  ngOnChanges() {
    this.setTree(this.ultimateFacetId)  
}


  setTree(paramsId) {
    this.facetTreeGQL.fetch({
      id: paramsId
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.loading = false;
          this.treeDS.data = ListToTree(JSON.parse(JSON.stringify(result.data.FacetTree)))
          this.treeControl.expand(this.treeControl.dataNodes.find(n => n.id = this.facetId))

          console.log(this.treeDS.data)
        }
        else {
          //
        }
      })
  }

  refresh(){
    this.setTree(this.ultimateFacetId)  
  }

  closeSidebar(){
    this.isSmallDevice$.subscribe((sml: boolean) => {
      if(sml){
        this.sidebarService.close()
      }
    });
      
  }
}

