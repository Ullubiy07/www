import React from "react"




class GraphInput extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="input-field">
                <textarea onChange={(e) => {
                    this.props.onUpdate(e.target.value)
                }} className="input-graph"></textarea>
            </div>
        )
    }
}

export default GraphInput