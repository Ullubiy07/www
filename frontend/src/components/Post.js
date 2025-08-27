import React from "react"
import { IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5"
import AddPost from "./AddPost"


class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        }
        this.closeForm = this.closeForm.bind(this)
    }
    render() {
        return (
            <div className="post" ref={(item) => this.postDiv = item}>
                {(this.props.post.author_id == JSON.parse(localStorage.getItem('user')).id) &&
                    <div className="change-icons">
                        <IoHammerSharp className="edit-icon" onClick={() => {
                            this.setState({editForm: !this.state.editForm})
                            if (!this.state.editForm) {
                                this.postDiv.classList.toggle('expansion-body')
                            } else {
                                this.postDiv.classList.toggle('expansion-body', false)
                            }
                        }} />
                        <IoCloseCircleSharp className="delete-icon" onClick={() => this.props.onDelete(this.props.post.id)} />
                    </div>
                }
                <h3 style={{fontWeight: "bold"}}>{this.props.post.title}</h3>
                <h4 style={{color: "white", fontWeight: "100", textIndent: "5px"}}>{this.props.post.content}</h4>
                <b>{"- " + this.props.post.topic}</b>
                {<AddPost onAdd={this.props.onEdit} post={this.props.post} onClose={this.closeForm} />}
            </div>
        )
    }
    closeForm() {
        this.setState({editForm: false})
        this.postDiv.classList.toggle('expansion-body', false)
    }
}



export default Post