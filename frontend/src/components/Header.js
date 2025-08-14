import React from "react"

class Header extends React.Component {
    render() {
        return (
            <div className="mainHeader">
                <div className="mainHeaderLine">
                    <a href="/" className="mainPage">Главная</a>
                    <a href="/posts" className="mainPage">Посты</a>
                </div>
            </div>
        )
    }
}



export default Header