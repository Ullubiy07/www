import React from "react"
import Header from "../components/Header"
// import axios from "axios"


class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h3 style={{color: "white", position: "absolute", top: "40%", left: "10%"}}>Это главная страница сайта, добро пожаловать!</h3>
            </div>
        )
    }
}



export default Home