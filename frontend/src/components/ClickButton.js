import React from "react"

class ClickButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
        this.onMouseClick = this.onMouseClick.bind(this)
    }
    render() {
        return (
            <button id="clickButton" onClick={this.onMouseClick}> {this.state.counter} </button>
        )
    }
    onMouseClick() {
        this.setState({counter: this.state.counter + 1})
    }
}


// const ClickButton = (props) => {
//     const [click, setClick] = useState(0)
//     return (
//         <button onClick={() => setClick(click + 1)}> {click} </button>
//     )
// }

export default ClickButton