import React from 'react'
import Header from '../components/Header'
import GraphInput from '../components/GraphInput'
import GraphCanvas from '../components/GraphCanvas'
import NodeMinDistance from '../components/NodeMinDistance'


class GraphTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [],
            edges: [],
            data: ''
        }
        this.updateGraph = this.updateGraph.bind(this)
    }

    render() {
        return (
            <div>
                <Header />
                <GraphInput onUpdate={this.updateGraph} />
                <GraphCanvas nodes={this.state.nodes} edges={this.state.edges} />
                <NodeMinDistance data={this.state.data} />
            </div>
            
        )
    }

    checkLine(line) {
        const cnt = line.filter((el) => el != "").length
        return !(cnt == 2 || cnt == 3) || line[0] == '' || line[1] == ''
    }

    updateGraph(value) {
        let nodes = [], edges = [], new_data = ''

        value = value.split('\n')
        for (let pair of value) {
            pair = pair.split(' ')

            if (this.checkLine(pair)) {
                continue
            }
            let weight = (pair[2] == undefined || pair[2] == "") ? "" : pair[2]
            let new_weight = (weight == "") ? "1" : weight
            
            new_data += pair[0] + " " + pair[1] + " " + new_weight + " "

            nodes.push(pair[0])
            nodes.push(pair[1])
            edges.push([pair[0], pair[1], weight])
        }

        new_data = `${edges.length}` + " " + new_data

        if (JSON.stringify(this.state.edges) === JSON.stringify(edges)) return

        this.setState({nodes: nodes})
        this.setState({edges: edges})
        this.setState({data: new_data})
    }
}

export default GraphTool
