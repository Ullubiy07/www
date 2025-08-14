import React from "react"
import Posts from "../components/Posts"
import Header from "../components/Header"
import AddPost from "../components/AddPost"
// import axios from "axios"


class PostPage extends React.Component {
    constructor(props) {
        super(props)
        // fetch("http://127.0.0.1:8000").then(res => {
        //     return res.json()
        // }).then(data => {
        //     this.setState({posts: [data]})
        // })

        // this.state = {
        //     posts: []
        // }
        this.state = {
            posts: [
                {
                    id: "1",
                    firstname: 'James',
                    info: 'Привет я дурачек, работаю программистом в Москве, хочу сделать дурацкий сайт.',
                    job: "programmer"
                }
            ]
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
    addPost(post) {
        const id = this.state.posts.length + 1;
        this.setState({
            posts: [...this.state.posts, {id, ...post}]
        })
    }
    editPost(post) {
        const newMass = this.state.posts
        newMass[post.id - 1] = post
        this.setState({posts: newMass})
    }
    deletePost(id) {
        const newMass = [...this.state.posts.slice(0, id - 1), ...this.state.posts.slice(id, this.state.posts.length)]
        for (let i = 0; i < newMass.length; i++) {
            newMass[i].id = i + 1
        }
        this.setState({
            posts: newMass
        })
    }
}



export default PostPage