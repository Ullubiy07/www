import React from "react"
import axios from 'axios'



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
                        <h3 style={{color: 'white'}}> Результат: {this.state.result == 1e9 ? '∞' : this.state.result} </h3>
                    </div>
                </details>
            </div>
        )
    }
    async getMinDistance(from, to) {

        const response = await axios.post(`http://localhost:8000/graph-dist?input=${this.props.data} ${from} ${to}`)
        this.setState({result: response.data})
    }
}


export default NodeMinDistance