import React from "react"
import Post from "./Post"

class Posts extends React.Component {
    render() {
        return (
            <div>
                {this.props.posts.map((item) => (
                    <Post key={item.id} post={item} onDelete={this.props.onDelete} onEdit={this.props.onEdit} />
                ))}
            </div>
        )
    }
}



export default Posts