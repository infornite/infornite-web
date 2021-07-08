export var cytoLayouts = {
    defaultLayout: {
        name: 'grid',
        animate: false
    },
    dagreLayout: {
        name: 'dagre',
        rankDir: 'LR',
        directed: true,
        padding: 0,
        animate: true,
    },
    dagreLayoutTB: {
        name: 'dagre',
        rankDir: 'TB',
        directed: true,
        padding: 0,
        animate: true,
    },
    gridLayout: {
        name: 'grid',
        rankDir: 'TB',
        animate: true,
    },
    circleLayout: {
        name: 'circle',
        animate: true,
    },
    breadthFirstLayout: {
        name: 'breadthfirst',
        animate: true,
    },
    colaLayout: {
        name: 'cola',
        animate: true,//'end',
        randomize: true,
        nodeDimensionsIncludeLabels: true,
        nodeSpacing: function( node ){ return 10; },
    }, klayLayout: {
        name: 'klay',
        animate: true
    }, ciseLayout: {
        name: 'cise',
        animate: 'end',
        clusters: function(node) {
            return node.data("clusterID");
          }
    }
}