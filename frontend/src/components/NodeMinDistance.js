import React from "react"
import axios from 'axios'
import { AiFillEyeInvisible } from "react-icons/ai"



class NodeMinDistance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: '',
            end: '',
            result: ''
        }
    }
    render() {
        return (
            <div className="node-dist">
                <details style={{color: 'white'}}>
                    <summary> Кратчайшие расстояния </summary>
                    <div>
                        <input onChange={(e) => this.setState({start: e.target.value})} />
                        <input onChange={(e) => this.setState({end: e.target.value})} />
                        <button type='button' onClick={() => this.getMinDistance(this.state.start, this.state.end)}> Найти </button>
                        <AiFillEyeInvisible onClick={() => this.clearEdgesColor()} className='visible-path-button' />
                        <h3 style={{color: 'white'}}> Результат: {this.state.result} </h3>
                    </div>
                </details>
            </div>
        )
    }

    clearEdgesColor() {
        if (this.props.cy == null) return
        this.props.cy.edges().forEach((edge) => 
            this.setEdgeColor(edge.data('key'), 'black')
        )
    }

    setNodeColor(id, color) {
        this.props.cy.nodes(`[id="${id}"]`).style('background-color', color)
    }
    
    setEdgeColor(key, color) {
        this.props.cy.edges(`[key="${key}"]`).style('line-color', color)
    }

    async getMinDistance(from, to) {
        if (this.props.cy == null) return

        let options = {
            root : `#${from}`,
            weight : function (edge) {
                return parseInt(edge.data('weight'));
            },
            directed : this.props.directed
        }
        let dijkstra = this.props.cy.elements().dijkstra(options)
        this.setState({result: dijkstra.distanceTo(`#${to}`)})
        let path = dijkstra.pathTo(`#${to}`)

        path.edges().forEach(edge => {
            this.setEdgeColor(edge.data('key'), 'orange')
        })
        // const response = await axios.post(`http://localhost:8000/graph-dist?input=${this.props.data} ${from} ${to}`)
        // this.setState({result: response.data})
    }
}


export default NodeMinDistance