import React from "react"
import Posts from "../components/Posts"
import Header from "../components/Header"
import AddPost from "../components/AddPost"

import axios from "axios"


class PostPage extends React.Component {
    constructor(props) {
        super(props)
        try {
            axios.get('http://localhost:8000/posts').then(response => {
                this.setState({posts: response.data})
            })
        } finally {
            this.state = {
                posts: []
            }
        }
        this.addPost = this.addPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
    }
    render() {
        return (<div>
            <Header />
            <Posts posts={this.state.posts} onDelete={this.deletePost} onEdit={this.editPost} />
            <aside>
                <AddPost onAdd={this.addPost} />
            </aside>
        </div>)
    }
    async addPost(post) {
        post.author_id = JSON.parse(localStorage.getItem('user')).id
        const response = await axios.post('http://localhost:8000/add_post', post)
        this.setState({posts: [...this.state.posts, response.data]})
    }
    async editPost(post) {
        post.author_id = JSON.parse(localStorage.getItem('user')).id
        const response = await axios.put(`http://localhost:8000/edit_post/${post.id}`, post)
        const id = this.state.posts.findIndex((el) => el.id == post.id)
        let newMass = this.state.posts
        newMass[id] = post
        this.setState({posts: newMass})
    }
    async deletePost(id) {
        const response = await axios.delete(`http://localhost:8000/delete_post/${id}`)
        this.setState({posts: this.state.posts.filter((post) => post.id != id)})
    }
}



export default PostPage