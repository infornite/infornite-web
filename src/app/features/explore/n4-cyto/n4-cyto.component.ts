import { Component, OnChanges, Renderer2, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CytoscapeOptions, ElementsDefinition, NodeDefinition, EdgeDefinition, } from 'cytoscape'
import cytoscape, { SingularData, StylesheetStyle, Stylesheet, ElementStylesheetStyle, ElementStylesheetCSS } from 'cytoscape';
import dblclick from 'cytoscape-dblclick';
import {cytoLayouts} from './cyto-layouts'
import klay from 'cytoscape-klay';
import cise from 'cytoscape-cise';

import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';

cytoscape.use(cola);
cytoscape.use(dagre);
cytoscape.use(klay);
cytoscape.use(cise);
cytoscape.use(dblclick);



declare var cyo: CytoscapeOptions;

@Component({
    selector: 'n4-cyto',
    templateUrl: './n4-cyto.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styles: [`#cy {
        height: 100%;
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
    }`]
})
export class N4CytoComponent implements OnChanges {

    //@ViewChild('cy', { static: true }) private el: ElementRef;
    @Input() public nodes: NodeDefinition[];
    @Input() public edges: EdgeDefinition[];
    //@Input() public style: any;
    
    @Input() public zoom: any;

    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Output() dblClick: EventEmitter<any> = new EventEmitter<any>();

    activeLayout: any = cytoLayouts.colaLayout;

    private cy: cytoscape.Core;
    sy: cytoscape.Stylesheet;
    stylesheet: StylesheetStyle;

    public constructor(
        private renderer: Renderer2,
    ) {
        this.zoom = this.zoom || {
            min: 0.1,
            max: 1.5
        };
    }

    public ngOnChanges(): any {
        this.render();
    }

    public render() {
        let cy_contianer = this.renderer.selectRootElement("#cy");
        let localselect = this.select;
        let localDblClick = this.dblClick;

        let localCy = cytoscape(this.getCytoOptions())
        this.cy = localCy;

        localCy.on('tap', 'node', function (e) {
            var node = e.target;
            var neighborhood = node.neighborhood().add(node);

            localCy.elements().addClass('faded');
            neighborhood.removeClass('faded');
            localselect.emit([node.data('id'),node.data('name')]);
        });

        localCy.on('tap', function (e) {
            if (e.target === localCy) {
                localCy.elements().removeClass('faded');
            }
        });

        localCy.on('cxttapend', 'node', function (e) {
            var node = e.target;
            localDblClick.emit(node.data('id'));
        });

    }

    getCytoOptions(): CytoscapeOptions {
        let cy_contianer = this.renderer.selectRootElement("#cy");
        return {
            container: cy_contianer,
            layout: this.activeLayout,
            minZoom: this.zoom.min,
            maxZoom: this.zoom.max,
            style: this.nodes.length < 50 ? this.getCytoStylesheet(false) : this.getCytoStylesheet(true),
            elements: {
                nodes: this.nodes,
                edges: this.edges
            }
        }
    }

    getCytoStylesheet(basic: boolean = false): any[] {
        if (basic) {
            return [
                {
                    selector: 'node',
                    css: {
                        'shape': 'data(shapeType)',
                        'border-width': 3,
                        'border-color': 'data(colorCode)',
                        'width': 'mapData(weight, 20, 40, 10, 30)',
                        'content': 'data(name)',
                        //'text-valign': 'bottom',
                        'font-size': 10,
                        //'background-color': 'data(colorCode)',
                        //'background-opacity': '0.4',
                        'min-zoomed-font-size': '15',
                    },
                },
                {
                    selector: 'node:parent',
                    css: {
                        'opacity': 0.333,
                        //'border-color': '#2B65EC'
                    },
                },
                {
                    selector: ':selected',
                    css: {
                        'border-width': 4,
                    },
                },
                {
                    selector: 'edge',
                    css: {
                        'curve-style': 'haystack ',
                        //'opacity': 0.666,
                        'width': 'mapData(strength, 70, 100, 2, 6)',
                        'target-arrow-shape': 'triangle',
                        'line-color': 'data(colorCode)',
                        //'source-arrow-color': 'data(colorCode)',
                        //'target-arrow-color': 'data(colorCode)',
                    },
                },
                {
                    selector: 'edge.questionable',
                    css: {
                        'line-style': 'dotted',
                        'target-arrow-shape': 'diamond'
                    },
                },
                {
                    selector: '.faded',
                    css: {
                        'opacity': 0.5,
                        'text-opacity': 0
                    },
                },
            ]
        }
        else {
            return [
                {
                    selector: 'node',
                    css: {
                        'shape': 'data(shapeType)',
                        'border-width': 3,
                        'border-color': 'data(colorCode)',
                        'padding': '4px',
                        'width': 'mapData(weight, 20, 40, 10, 30)',
                        'height': 'mapData(weight, 20, 40, 10, 30)',
                        'content': 'data(name)',
                        'text-valign': 'bottom',
                        'font-size': 10,
                        'background-image-opacity': '0.5',
                        'background-color': 'data(colorCode)',
                        'background-opacity': '0.4',
                        'background-image': 'data(icon)',

                        //'background-image': function (ele) { return 'url(../../../../assets/img/icons/' + ele.data('icon') + '.svg) no-repeat center' },
                    },
                },
                {
                    selector: 'node:parent',
                    css: {
                        'opacity': 0.333,
                        'border-color': '#2B65EC'
                    },
                },
                {
                    selector: ':selected',
                    css: {
                        'border-width': 4,
                    },
                },
                {
                    selector: 'edge',
                    css: {
                        'curve-style': 'bezier',
                        'opacity': 0.666,
                        'width': 'mapData(strength, 70, 100, 2, 6)',
                        'target-arrow-shape': 'triangle',
                        'line-color': 'data(colorCode)',
                        'source-arrow-color': 'data(colorCode)',
                        'target-arrow-color': 'data(colorCode)',
                        'label': 'data(label)',
                        'edge-text-rotation': 'autorotate',
                        'font-size': 10,
                        'text-margin-y': '-10px'
                    },
                },
                {
                    selector: 'edge.questionable',
                    css: {
                        'line-style': 'dotted',
                        'target-arrow-shape': 'diamond'
                    },
                },
                {
                    selector: '.faded',
                    css: {
                        'opacity': 0.5,
                        'text-opacity': 0
                    },
                },
            ]
        }

    }

    addElements(nodes: NodeDefinition[] = [], edges: EdgeDefinition[] = []) {
        if (nodes.length > 0 || edges.length > 0) {
            var new_elements = {
                nodes: nodes,
                edges: edges
            }

            this.cy.add(new_elements)
            
            this.cy.style(this.cy.nodes().length < 50 ? this.getCytoStylesheet(false) : this.getCytoStylesheet(true))
            setTimeout(() => { this.cy.layout(this.activeLayout).run() }, 1000)
        }
    }

    redraw() {
        this.cy.style(this.cy.nodes().length < 50 ? this.getCytoStylesheet(false) : this.getCytoStylesheet(true))
        this.cy.layout(this.activeLayout).run()
    }

    setCytoLayout(layout: string) {
        switch (layout) {
            case 'cola': {
                this.cy.layout(cytoLayouts.colaLayout).run()
                this.activeLayout = cytoLayouts.colaLayout;
                break;
            }
            case 'grid': {
                this.cy.layout(cytoLayouts.gridLayout).run()
                this.activeLayout = cytoLayouts.gridLayout;
                break;
            }
            case 'circle': {
                this.cy.layout(cytoLayouts.circleLayout).run()
                this.activeLayout = cytoLayouts.circleLayout;
                break;
            }
            case 'dagre': {
                this.cy.layout(cytoLayouts.dagreLayout).run()
                this.activeLayout = cytoLayouts.dagreLayout;
                break;
            }
            case 'dagreTB': {
                this.cy.layout(cytoLayouts.dagreLayoutTB).run()
                this.activeLayout = cytoLayouts.dagreLayoutTB;
                break;
            }
            case 'dagreLR': {
                this.cy.layout(cytoLayouts.dagreLayout).run()
                this.activeLayout = cytoLayouts.dagreLayout;
                break;
            }
            case 'breadthFirst': {
                this.cy.layout(cytoLayouts.breadthFirstLayout).run()
                this.activeLayout = cytoLayouts.breadthFirstLayout;
                break;
            }
            case 'default': {
                this.cy.layout(cytoLayouts.defaultLayout).run()
                this.activeLayout = cytoLayouts.defaultLayout;
                break;
            }
            case 'klay': {
                this.cy.layout(cytoLayouts.defaultLayout).run()
                this.activeLayout = cytoLayouts.klayLayout;
                break;
            }
            case 'cise': {
                this.cy.layout(cytoLayouts.ciseLayout).run()
                this.activeLayout = cytoLayouts.ciseLayout;
                break;
            }
            default: {
                this.cy.layout(cytoLayouts.defaultLayout).run()
                this.activeLayout = cytoLayouts.defaultLayout;
                break;
            }
        }
    }
}