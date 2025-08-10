import React from "react"

class Header extends React.Component {
    render() {
        return (
            <div className="mainHeader">
                <div className="mainHeaderLine">
                    <a href="/" className="mainPage">Главная</a>
                    <a href="/" className="mainPage">баня</a>
                    <a href="/" className="mainPage">волосатых</a>
                    <a href="/" className="mainPage">мужиков</a>
                </div>
            </div>
        )
    }
}



export default Header