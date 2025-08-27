import React from "react"
import * as ReactDomClient from "react-dom/client"
import App from "./App"
import "./styles/main.css"



const app = ReactDomClient.createRoot(document.body)
app.render(
    <App />
)