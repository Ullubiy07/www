import React from "react"
import Users from "./components/Users"
import Header from "./components/Header"
import AddUser from "./components/AddUser"


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [
                {
                    id: 1,
                    firstname: 'James',
                    info: 'Привет я дурачек, работаю программистом в Москве, хочу сделать дурацкий сайт.',
                    job: "programmer"
                }
            ]
        }
        this.addUser = this.addUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.editUser = this.editUser.bind(this)
    }
    render() {
        fetch('https://api.rawg.io/api/platforms?key=e599206a964546f18457a25bbca09a49')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.results[0].games[0]);
        })
        return (<div>
            <Header />
            <Users users={this.state.users} onDelete={this.deleteUser} onEdit={this.editUser} />
            <aside>
                <AddUser onAdd={this.addUser} />
            </aside>
        </div>)
    }
    addUser(user) {
        const id = this.state.users.length + 1;
        this.setState({
            users: [...this.state.users, {id, ...user}]
        })
    }
    editUser(user) {
        const newMass = this.state.users
        newMass[user.id - 1] = user
        this.setState({users: newMass})
    }
    deleteUser(id) {
        const newMass = [...this.state.users.slice(0, id - 1), ...this.state.users.slice(id, this.state.users.length)]
        for (let i = 0; i < newMass.length; i++) {
            newMass[i].id = i + 1
        }
        this.setState({
            users: newMass
        })
    }
}



export default App