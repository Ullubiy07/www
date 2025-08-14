import React from "react"

import HomeBeforeAuth from "./pages/HomeBeforeAuth"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Auth from "./pages/Auth"
import NotFound from "./pages/NotFound"
import PostPage from "./pages/PostPage"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import axios from "axios"


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            cur_user: {
                id: 0,
                name: '',
                password: '',
                isAuth: false
            }
        }
        this.addUser = this.addUser.bind(this)
        this.checkAuthUser = this.checkAuthUser.bind(this)
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    {!this.state.cur_user.isAuth ? (
                        <>
                            <Route path="/" element={<HomeBeforeAuth />} />
                            <Route path="/reg" element={<SignUp onAdd={this.addUser} />} />
                            <Route path="/auth" element={<Auth onCheck={this.checkAuthUser} />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/posts" Component={PostPage} />
                        </>
                    )}
                    <Route path="*" Component={NotFound} />
                </Routes>
            </BrowserRouter>
            
        )
    }
    addUser(user) {
        console.log(user)
        const new_id = this.state.users.length + 1;
        const new_user = {id: new_id, name: user.name, password: user.password, isAuth: true}

        this.setState({cur_user: new_user})
        this.setState({users: [...this.state.users, new_user]})
    }
    checkAuthUser(user) {
        let val = false
        if (val) {
            this.setState({cur_user: {
                id: this.state.cur_user.id,
                name: this.state.cur_user.name,
                password: this.state.cur_user.password,
                isAuth: true
            }})
        }
        console.log(this.state.cur_user.isAuth)
        return val
    }
}



export default App