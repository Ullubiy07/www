import React from "react"


class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            info: "",
            job: ""
        }
        if (props.user) {
            this.state = {
                firstname: props.user.firstname,
                info: props.user.info,
                job: props.user.job
            }
        }
    }
    render() {
        return (<form className="add-user-form" ref={(item) => this.addForm = item}>
            <input value={this.state.firstname} placeholder="Имя" onChange={(e) => this.setState({firstname: e.target.value})} />
            <textarea value={this.state.info} placeholder="Информация о себе" onChange={(e) => this.setState({info: e.target.value})} />
            <input value={this.state.job} placeholder="Профессия" onChange={(e) => this.setState({job: e.target.value})} />

            <button type="button" onClick={() => {
                if (!this.state.firstname || !this.state.info || !this.state.job) {
                    alert("Заполните все поля")
                    return
                }
                this.addForm.reset()
                let result = {
                    firstname: this.state.firstname,
                    info: this.state.info,
                    job: this.state.job
                }
                if (this.props.user) {
                    result.id = this.props.user.id;
                    this.props.onClose()
                }
                this.props.onAdd(result)
            }}>Добавить</button>
            
        </form>)
    }
}



export default AddUser