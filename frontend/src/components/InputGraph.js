import React, {useState} from "react"




class InputGraph extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="input-field">
                <textarea onChange={(e) => {
                    this.props.onAdd(e.target.value)
                }} className="input-graph"></textarea>
            </div>
        )
    }
}

export default InputGraph