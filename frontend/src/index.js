import * as ReactDomClient from "react-dom/client"
import App from "./App"
import "./styles/main.css"
import "./styles/auth.css"
import "./styles/graph.css"


const app = ReactDomClient.createRoot(document.body)
app.render(
    <App />
)