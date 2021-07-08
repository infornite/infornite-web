import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FacetBreadcrumbGQL, FacetBreadcrumb, FacetType } from '@app/graphql/schema'
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '@app/services/sidebar.service';
import { ExploreGQL, RandomGQL } from '@app/graphql/schema'
import { NodeDefinition, EdgeDefinition } from 'cytoscape'
import { N4CytoComponent } from '../n4-cyto/n4-cyto.component';


@Component({
  selector: 'in4-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @ViewChild(N4CytoComponent) cyto: N4CytoComponent;

  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));

  facetBreadcrumb: FacetBreadcrumb
  sidebarState: any

  //graph data
  wrkNodes: NodeDefinition[] = []
  wrkEdges: EdgeDefinition[] = []

  nodes: NodeDefinition[] = []
  edges: EdgeDefinition[] = []
  resultsLoading: boolean;

  selectedNodeId: String
  selectedNodeName: String

  //graph events 
  node_name: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private facetBreadcrumbGQL: FacetBreadcrumbGQL,
    private activatedRoute: ActivatedRoute,
    private sidebarService: SidebarService,
    private exploreGQL: ExploreGQL,
    private randomGQL: RandomGQL,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.setBreadcrumb(params.id)
        this.getData(params.id)
      }
      else {
        this.fetchRandom()
      }
    })

    this.sidebarState = this.sidebarService.sidebarStateObservable$
    this.sidebarService.showHamburger()
  }

  fetchRandom(){
    this.randomGQL.fetch(null,{
      fetchPolicy: "network-only"
    })
          .pipe(take(1))
          .subscribe((result) => {
            var rid = result.data.Random[0].id
            this.setBreadcrumb(rid)
            this.getData(rid)
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
        }
      })
  }

  nodeChange(event) {
    this.selectedNodeId = event[0]
    this.selectedNodeName = event[1]
  }

  nodeDblClick(event) {
    this.getData(event, true)
  }


  getData(facetId: string, update: boolean = false) {
    this.resultsLoading = true;

    this.exploreGQL.fetch({
      filter: {
        facetId: facetId,
      }
    },
      {
        //fetchPolicy: "network-only"
      }
    )
      .pipe(take(1))
      .subscribe((result) => {
        
        this.wrkEdges = [];
        this.wrkNodes = [];
        if (result) {
          result.data.Explore.forEach((item, index) => {
            //if (item.connection != 'HAS_CHILD') { }
           

            this.wrkEdges.push(
              {
                data: {
                  id: item.id,
                  source: item.source,
                  target: item.target,
                  colorCode: '#424242',
                  label: item.connection.toLowerCase().replace(/_/g, " "),
                  strength: 10
                }
              }
            )

            var sourceNode: NodeDefinition = {
              data: {
                id: item.source,
                name: item.sourceName,
                clusterID: item.sourceType,
                //parent: item.sourceParentId,
                weight: 100,
                colorCode: this.getNodeColor(item.sourceType),
                shapeType: 'ellipse',
                icon: '../../../../assets/img/icons/' + item.sourceType.toLowerCase().replace(/_/g, "-") + '.svg',
              }
            }

            var targetNode: NodeDefinition = {
              data: {
                id: item.target,
                name: item.targetName,
                clusterID: item.targetType,
                //parent: item.targetParentId,
                weight: 200,
                colorCode: this.getNodeColor(item.targetType),
                shapeType: 'ellipse',
                icon: '../../../../assets/img/icons/' + item.targetType.toLowerCase().replace(/_/g, "-") + '.svg',
              }
            }

            this.wrkNodes.push(sourceNode)
            this.wrkNodes.push(targetNode)
            //const tempNodes = [...this.nodes];
          })
          if (!update) {
            this.nodes = [];
            this.edges = [];
            const tempNodes = [...this.wrkNodes];
            const tempEdges = [...this.wrkEdges];
            this.nodes = tempNodes;
            this.edges = tempEdges;
          }
          else {
            this.cyto.addElements(this.wrkNodes, this.wrkEdges)
          }
        }
        this.resultsLoading = false;
      })
  }

  redraw() {
    this.cyto.redraw()
  }

  getNodeColor(type: FacetType) {
    switch (type) {
      case FacetType.KnowledgeArea: {
        return '#0D47A1';
        break;
      }
      case FacetType.Element: {
        return '#008B00';
        break;
      }
      case FacetType.Report: {
        return '#FFDE03';
        break;
      }
      case FacetType.System: {
        return '#B00020';
        break;
      }
      case FacetType.Table: {
        return '#F44336';
        break;
      }
      case FacetType.Attribute: {
        return '#212121';
        break;
      }
      case FacetType.Control: {
        return '#737373';
        break;
      }
      case FacetType.Stakeholder: {
        return '#005457';
        break;
      }
      case FacetType.Artefact: {
        return '#6200EE';
        break;
      }
      default: {
        //statements; 
        break;
      }
    }

  }

  setLayout(layout: string = 'default') {
    this.cyto.setCytoLayout(layout)
  }


}
