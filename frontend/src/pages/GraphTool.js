import React from 'react'
import Header from '../components/Header'
import Cytoscape from '../components/Cytoscape'
import InputGraph from '../components/InputGraph'

class GraphTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [],
            edges: []
        }
        this.UpdateGraph = this.UpdateGraph.bind(this)
    }



    render() {
        return (
            <div>
                <Header />
                <InputGraph onAdd={this.UpdateGraph} />
                <Cytoscape nodes={this.state.nodes} edges={this.state.edges} />
            </div>
        )
    }



    UpdateGraph(value) {
        let nodes = [], edges = []
        try {
            value = value.split('\n')
            for (let pair of value) {
                pair = pair.split(' ')
                if (pair.length != 2 || pair[0] == '' || pair[1] == '') {
                    continue
                }
                nodes.push([pair[0], pair[0]])
                nodes.push([pair[1], pair[1]])
                edges.push([pair[0], pair[1]])
            }
        } catch (error) {
            console.log('GraphTool: ', error)
            return
        }
        this.setState({nodes: nodes})
        this.setState({edges: edges})
    }
}

export default GraphTool
