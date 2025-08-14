import React from "react"
import HeaderBeforeAuth from "../components/HeaderBeforeAuth"
import Posts from "../components/Posts"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'


class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }
        this.CheckAuth = this.CheckAuth.bind(this)
    }
    render() {
        return (
            <div>
                <HeaderBeforeAuth />
                <form className="auth-form">
                    <input placeholder="Логин" onChange={(e) => this.setState({name: e.target.value})} />
                    <input placeholder="Пароль" onChange={(e) => this.setState({password: e.target.value})} />
                    <button type="button" onClick={this.CheckAuth}>Войти</button>
                </form>
                <ToastContainer />
            </div>
        )
    }
    CheckAuth() {
        let val = this.props.onCheck({name: this.state.name, password: this.state.password})
        if (val) {
            window.location.href = "../"
        } else {
            toast.error("Неверный логин или пароль");
        }
    }
}



export default Auth