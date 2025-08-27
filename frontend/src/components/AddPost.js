import React from "react"


class AddPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            topic: "",
            content: ""
        }
        if (props.post) {
            this.state = {
                title: props.post.title,
                topic: props.post.topic,
                content: props.post.content
            }
        }
    }
    render() {
        return (<form className="add-post-form" ref={(item) => this.addForm = item}>
            <input value={this.state.title} placeholder="Заголовок" onChange={(e) => this.setState({title: e.target.value})} />
            <input value={this.state.topic} placeholder="Тема" onChange={(e) => this.setState({topic: e.target.value})} />
            <textarea value={this.state.content} placeholder="Текст" onChange={(e) => this.setState({content: e.target.value})} />

            <button type="button" onClick={() => {
                if (!this.state.title || !this.state.topic || !this.state.content) {
                    alert("Заполните все поля")
                    return
                }
                this.addForm.reset()
                let result = {
                    title: this.state.title,
                    topic: this.state.topic,
                    content: this.state.content
                }
                if (this.props.post) {
                    result.id = this.props.post.id;
                    this.props.onClose()
                }
                this.props.onAdd(result)
            }}>Добавить</button>
            
        </form>)
    }
}



export default AddPost