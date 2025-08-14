import React from "react"
import HeaderBeforeAuth from "../components/HeaderBeforeAuth"
import { Link } from 'react-router-dom'


class SignUp extends React.Component {
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
                <HeaderBeforeAuth />
                <form className="auth-form">
                    <input placeholder="Логин" onChange={(e) => this.setState({name: e.target.value})} />
                    <input placeholder="Пароль" onChange={(e) => this.setState({password: e.target.value})} />
                    <Link to="../">
                        <button onClick={() => this.props.onAdd({name: this.state.name, password: this.state.password})}>Зарегистрироваться</button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default SignUp