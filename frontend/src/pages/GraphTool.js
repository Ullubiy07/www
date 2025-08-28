import React from 'react'
import Header from '../components/Header'
import GraphInput from '../components/GraphInput'
import GraphCanvas from '../components/GraphCanvas'



class GraphTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [],
            edges: []
        }
        this.updateGraph = this.updateGraph.bind(this)
    }

    render() {
        return (
            <div>
                <Header />
                <GraphInput onUpdate={this.updateGraph} />
                <GraphCanvas nodes={this.state.nodes} edges={this.state.edges} />
            </div>
        )
    }

    updateGraph(value) {
        let nodes = [], edges = []

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
        if (JSON.stringify(this.state.nodes) === JSON.stringify(nodes)) {
            return;
        }
        this.setState({nodes: nodes})
        this.setState({edges: edges})
    }
}

export default GraphTool
