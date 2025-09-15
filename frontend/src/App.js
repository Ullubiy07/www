import React from "react"

import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Auth from "./pages/Auth"
import NotFound from "./pages/NotFound"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import GraphTool from "./pages/GraphTool"
import MyGraphs from './pages/MyGraphs'

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import env from "react-dotenv"

import axios from "axios"



class App extends React.Component {
    constructor(props) {
        super(props)

        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }
    render() {
        let user = localStorage.getItem('user')
        return (
            <BrowserRouter>
                <Routes>

                    <Route element={<ProtectedRoutes isAuth={user ? JSON.parse(user).isAuth : false} />}>
                        <Route path="/graph-tool" element={<GraphTool />} />
                        <Route path="/my-graphs" element={<MyGraphs />} />
                    </Route>

                    <Route path="/" element={<Home />} />
                    <Route path="/reg" element={<SignUp onAdd={this.register} />} />
                    <Route path="/auth" element={<Auth onCheck={this.login} />} />

                    <Route path="*" Component={NotFound} />
                </Routes>

                <ToastContainer />
            </BrowserRouter>
            
        )
    }
    async register(user) {

        const response = await axios.post(env.API_URL + '/add_user', {
            name: user.name,
            password: user.password
        })
        const new_user = {id: response.data.id, name: response.data.name, password: response.data.password, isAuth: true}
        localStorage.setItem('user', JSON.stringify(new_user))
        window.location = "../"
    }
    async login(user) {
        try {
            const response = await axios.get(env.API_URL + `/users/${user.name}/${user.password}`)
            const new_user = {id: response.data.id, name: response.data.name, password: response.data.password, isAuth: true}
            localStorage.setItem('user', JSON.stringify(new_user))
            window.location = "../"
        }
        catch {
            toast.error("Неправильный логин или пароль")
        }
    }
}



export default App