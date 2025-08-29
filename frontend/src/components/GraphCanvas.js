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

        this.setLayout = this.setLayout.bind(this)
        this.updateGraph = this.updateGraph.bind(this)
    }
    getNodes(nodes) {
        return nodes.map((data) => ({ data: { id: data, label: data } }))
    }

    getEdges(edges) {
        return edges.map(([source, target, weight], index) => ({ data: { source: source, target: target, key: `${index + 1}`, weight: weight } }))
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
                spacingFactor: 1,
            }).run()
        })
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.edges) !== JSON.stringify(this.props.edges)) {
            this.updateGraph()
        }
        
    }

    setLayout(value) {
        this.setState({layout: value})
        this.updateGraph()
    }

    setNodeColor(id, color) {
        this.cy.nodes(`[id="${id}"]`).style('background-color', color)
    }
    
    setEdgeColor(key, color) {
        this.cy.edges(`[key="${key}"]`).style('line-color', color)
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
