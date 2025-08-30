import React from "react"
import CytoscapeComponent from 'react-cytoscapejs'
import Dropdown from 'react-bootstrap/Dropdown'

import 'bootstrap/dist/css/bootstrap.min.css'


class GraphCanvas extends React.Component {

    layoutModes = {
        'grid': 'Сетка',
        'circle': 'Круг',
        'cose': 'Пружина',
        'breadthfirst': 'Дерево BFS'
    }

    constructor(props) {
        super(props)
        this.state = {
            layout: 'grid',
            elements: []
        }
        this.cy = null

        this.setLayout = this.setLayout.bind(this)
        this.updateGraph = this.updateGraph.bind(this)
    }
    getNodes(nodes) {
        return nodes.map((data) => ({ data: { id: data, label: data } }))
    }

    getEdges(edges) {
        return edges.map(([source, target, weight], index) => ({ data: { source: source, target: target, key: `${index + 1}`, weight: weight } }))
    }

    getNode(nodes) {
        return { data: { id: nodes, label: nodes } }
    }
    getEdge(edge) {
        return { data: { source: edge[0], target: edge[1], key: `1`, weight: edge[2] } }
    }

    updateGraph() {
        const newElements = this.getNodes(this.props.nodes).concat(this.getEdges(this.props.edges))

        this.setState({ elements: newElements }, () => {
            this.cy.layout({
                name: this.state.layout,
                animate: true,
                animationDuration: 1000,
                animationEasing: 'ease-in-out',
                roots: '#1',
                fit: true,
                spacingFactor: 1
            }).run()
        })
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.edges) !== JSON.stringify(this.props.edges)) {
            this.updateGraph()
            this.props.updateCyto(this.cy)
        }
        
        // this.cy.resize()
        
        
        if (!this.props.directed) {
            this.cy.edges().removeClass('directed');
        } else {
            this.cy.edges().addClass('directed');
        }
    }

    setLayout(value) {
        this.setState({layout: value})
        this.updateGraph()
    }
    

    render() {
        return (
        <>  
            
            <Dropdown onSelect={this.setLayout}>
                <Dropdown.Toggle variant="secondary" id="dropdown-layout" >
                    {this.layoutModes[this.state.layout]}
                </Dropdown.Toggle>

                
                <Dropdown.Menu>
                    {Object.entries(this.layoutModes).map(([mode, modeRu]) => 
                        <Dropdown.Item eventKey={mode} key={mode}> {modeRu} </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            
            <CytoscapeComponent
                style={{
                    width: '600px',
                    height: '500px',
                    position: 'absolute',
                    top: '50%',
                    left: '30%',
                    transform: 'translateY(-50%)',
                    borderRadius: '15px',
                    border: '3px solid black',
                    backgroundColor: 'white'
                }}
                cy={(cy) => {
                    this.cy = cy;
                    cy.zoom(1)
                    cy.userZoomingEnabled(false)
                    cy.center()
                    
                    
                    // let dijkstra = cy.elements().dijkstra('#1', function(edge){
                    //     return parseInt(edge.data('weight'));
                    // });
                    
                    // try {
                    //     let path = dijkstra.pathTo('#3');
                    //     console.log('Путь найден! Длина:', dijkstra.distanceTo('#3'));
                    //     path.nodes().forEach(function(node) {
                    //         console.log('Node in path: ' + node.data('id'));
                    //     });
                    // } catch {
                    //     console.log('error dijkstra')
                    // }
                }}
                elements={this.state.elements}
                stylesheet={[
                    {
                        'selector': 'node',
                        'style': {
                            'content': 'data(label)',
                            'text-valign': 'center',
                            'color': 'black',
                            'background-color': 'white',
                            'border-width': '2px',
                            'border-color': 'black',
                            'width': 40,
                            'height': 40,
                            'font-size': 20
                        }
                    },
                    {
                        'selector': 'edge',
                        'style': {
                            'content': 'data(weight)',
                            'line-color': 'black',
                            'curve-style': 'bezier',
                            'color': 'red',
                            'width': 2,
                            "text-rotation": "autorotate"
                        }
                    },
                    {
                        selector: 'edge.directed',
                        style: {
                            'content': 'data(weight)',
                            'line-color': 'black',
                            'curve-style': 'bezier',
                            'color': 'red',
                            'width': 2,
                            "text-rotation": "autorotate",
                            'target-arrow-color': '#0074D9',
                            'target-arrow-shape': 'triangle',
                            'arrow-scale': 1.5
                        }
                    },
                    {
                        'selector': ':selected',
                        'style': {
                            'background-color': '#34c6eb',
                        }
                    }
                ]}
            />
        </>)
    }
}



export default GraphCanvas


// if (prevProps.directed != this.props.directed && this.cy != null) {
//     let options = {'target-arrow-shape': 'triangle', 'arrow-scale': 1}
//     if (!this.props.directed) {
//         options = {'target-arrow-shape': 'none'}
//     }
//     console.log(options)
//     this.cy.style().selector('edge').style(options)
//     return
// }