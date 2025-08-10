import React from "react"
import { IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5"
import AddUser from "./AddUser"


class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        }
        this.closeForm = this.closeForm.bind(this)
    }
    render() {
        return (
            <div className="user" ref={(item) => this.userDiv = item}>
                <div className="change-icons">
                    <IoHammerSharp className="edit-icon" onClick={() => {
                        this.setState({editForm: !this.state.editForm})
                        if (!this.state.editForm) {
                            this.userDiv.classList.toggle('expansion-body')
                        } else {
                            this.userDiv.classList.toggle('expansion-body', false)
                        }
                    }} />
                    <IoCloseCircleSharp className="delete-icon" onClick={() => this.props.onDelete(this.props.user.id)} />
                </div>
                <h3 style={{fontWeight: "bold"}}>{this.props.user.firstname}</h3>
                <h4 style={{color: "white", fontWeight: "100", textIndent: "5px"}}>{this.props.user.info}</h4>
                <b>{"- " + this.props.user.job}</b>
                {<AddUser onAdd={this.props.onEdit} user={this.props.user} onClose={this.closeForm} />}
            </div>
        )
    }
    closeForm() {
        this.setState({editForm: false})
        this.userDiv.classList.toggle('expansion-body', false)
    }
}



export default User