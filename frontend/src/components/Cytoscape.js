import React from "react"
import CytoscapeComponent from 'react-cytoscapejs'
import Dropdown from 'react-bootstrap/Dropdown'

import 'bootstrap/dist/css/bootstrap.min.css'


class Cytoscape extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layout: 'grid',
            elements: []
        }
        this.LayoutChange = this.LayoutChange.bind(this)
        this.updateGraph = this.updateGraph.bind(this)
    }
    get_nodes(nodes) {
        let res = []
        for (const [Id, Label] of nodes) {
            res.push({ data: { id: Id, label: Label} })
        }
        return res
    }

    get_edges(edges) {
        let res = []
        for (const [source, target] of edges) {
            res.push({ data: { source: source, target: target, weight: 1} })
        }
        return res
    }

    updateGraph(flag) {
        const newElements = this.get_nodes(this.props.nodes).concat(this.get_edges(this.props.edges))
        
        if (flag) {
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
        } else {
            this.setState({ elements: newElements }, () => {
                this.cy.layout({
                    name: this.state.layout,
                    roots: '#1',
                    fit: true,
                    spacingFactor: 1,
                }).run()
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.nodes === this.props.nodes || prevProps.edges === this.props.edges) {
            return
        }
        this.updateGraph(0)
    }

    opt = {
        'cose': 'Пружина',
        'circle': 'Круг',
        'breadthfirst': 'Дерево BFS',
        'grid': 'Сетка',
        'concentric': 'Центр'
    }

    LayoutChange(value) {
        if (value == this.state.layout) return
        this.setState({layout: value})
        this.updateGraph(1)
    }
    

    render() {
        // const nodes_input = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['10', '10']]
        // const edges_input = [['1', '3'], ['7', '4'], ['5', '4'], ['9', '6'], ['4', '7'], ['6', '9'], ['10', '8'], ['4', '8'], ['8', '3'], ['3', '10'], ['2', '8'], ['9', '5'], ['10', '2'], ['9', '8'], ['10', '9'], ['1', '10'], ['3', '6'], ['4', '5'], ['8', '10'], ['3', '2']]
        
        return (
        <>  
            
            <Dropdown onSelect={this.LayoutChange}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                    {this.opt[this.state.layout]}
                </Dropdown.Toggle>

                
                <Dropdown.Menu>
                    <Dropdown.Item eventKey={'grid'}>Сетка</Dropdown.Item>
                    <Dropdown.Item eventKey={'circle'}>Круг</Dropdown.Item>
                    <Dropdown.Item eventKey={'cose'}>Пружина</Dropdown.Item>
                    <Dropdown.Item eventKey={'breadthfirst'}>Дерево BFS</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            
            <CytoscapeComponent style={{
                width: '600px',
                height: '500px',
                position: 'absolute',
                top: '50%',
                left: '30%',
                transform: 'translateY(-50%)',
                borderRadius: '15px',
                border: '3px solid black',
                backgroundColor: 'white',
            }}  
                cy={(cy) => {
                    this.cy = cy;
                    this.cy.on('tap', 'node', (e) =>
                        console.log( 'tapped ' + e.target.id() )
                    )
                    cy.layout({ name: 'null' }).stop();
                    cy.zoom(1)
                }}
                elements={this.state.elements}
                // layout={{
                //     name: this.state.layout,
                //     animate: true,
                //     roots: '#1',
                //     fit: true,
                //     spacingFactor: 1
                // }}
            
                stylesheet={[
                    {
                        'selector': 'node',
                        'style': {
                            'content': 'data(label)',
                            'text-valign': 'center',
                            'color': 'black',
                            'background-color': 'white',
                            'border-width': '3px',
                            'border-color': 'black',
                            'width': 40,
                            'height': 40,
                            'font-size': 20,
                            
                        }
                    },
                    {
                        'selector': 'edge',
                        'style': {
                            'line-color': 'black',
                            'curve-style': 'bezier',
                            
                        }
                    },
                    {
                        'selector': ':selected',
                        'style': {
                            'background-color': '#34c6eb'
                        }
                    }
                    // {
                    //     selector: 'edge.animated',
                    //     style: {
                    //         'line-color': '#ff6b6b',
                    //         'target-arrow-color': '#ff6b6b',
                    //         'transition-property': 'line-color, target-arrow-color',
                    //         'transition-duration': '1000ms',
                    //         'transition-timing-function': 'ease-in-out'
                    //     }
                    // }
                ]}
                userZoomingEnabled={false}
            />;
        </>)
    }
}



export default Cytoscape