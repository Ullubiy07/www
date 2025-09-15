import React from 'react'
import Header from '../components/Header'
import GraphInput from '../components/GraphInput'
import GraphCanvas from '../components/GraphCanvas'
import NodeMinDistance from '../components/NodeMinDistance'
import SaveGraphMenu from '../components/SavaGraphMenu'


class GraphTool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cy: null,
            nodes: [],
            edges: [],
            data: '',
            directed: false,
            isSave: false
        }
        this.updateGraph = this.updateGraph.bind(this)
        this.updateDirect = this.updateDirect.bind(this)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.updateDirect()} className='direction-button'> Ориентировать </button>
                <Header />
                <GraphInput onUpdate={this.updateGraph} />
                <GraphCanvas nodes={this.state.nodes} edges={this.state.edges} directed={this.state.directed} updateCyto={(cy) => this.setState({cy: cy})} />
                <NodeMinDistance data={this.state.data} directed={this.state.directed} cy={this.state.cy} />

                <div ref={(save) => this.save = save} onClick={() => {
                    this.setState({isSave: false})
                    this.save.classList.toggle('overlay')
                    
                }}/>
                <button className="save-button" onClick={() => {
                    this.setState({isSave: true})
                    this.save.classList.toggle('overlay')
                }}> Сохранить </button>

                {this.state.isSave &&
                    <SaveGraphMenu />
                }
            </div>
            
        )
    }

    updateDirect() {
        this.setState({directed: !this.state.directed})
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
