import React from "react"
import Header from "../components/Header"


class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }
    }
    render() {
        return (
            <div>
                <Header />
                <form className="auth-form">
                    <input placeholder="Логин" onChange={(e) => this.setState({name: e.target.value})} />
                    <input placeholder="Пароль" onChange={(e) => this.setState({password: e.target.value})} />
                    <button type="button" onClick={() => {
                        this.props.onCheck({name: this.state.name, password: this.state.password})
                    }}>Войти</button>
                </form>
            </div>
        )
    }
}



export default Auth