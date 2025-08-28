import React from "react"

import { Link } from "react-router-dom"
import { ImExit } from "react-icons/im"

class Header extends React.Component {
    render() {
        let user = localStorage.getItem('user')
        return (
            <div className="mainHeader">
                <div className="mainHeaderLine">
                    <Link to="/" className="mainPage">Главная</Link>
                    <Link to="/graph-tool" className="mainPage">Графы</Link>

                    
                    {!user && 
                        <div className="auth-buttons">
                            
                            <Link to="/auth">
                                <button type="button" className="login-button">Войти</button>
                            </Link>

                            <Link to="/reg">
                                <button type="button" className="reg-button">Регистрация</button>
                            </Link>
                        </div>
                    }
                    
                    {user &&
                        <ImExit className="exit-icon" onClick={() => {
                            localStorage.removeItem('user')
                            window.location = ".."
                        }} />
                    }
                </div>
            </div>
        )
    }
}



export default Header