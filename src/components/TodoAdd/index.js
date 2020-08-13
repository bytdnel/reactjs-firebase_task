import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
    todo: '',
    error: null
}

class TodoAddBase extends Component {
    constructor (props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = event => {
        event.preventDefault()
        const createdAt = new Date()
        const { todo } = this.state
        console.log({uid: this.props.uid, todo, createdAt})
        this.props.firebase.doAddTodo({todo, createdAt}, this.props.uid)
        this.setState({ ...INITIAL_STATE })
        localStorage.setItem('todo', JSON.stringify({todo, createdAt}))
        this.props.onAddTodo('todo')
    }

    onChange = event => this.setState({ [event.target.name]: event.target.value })

    render() {
        const {
            todo,
            error
        } = this.state
        return(
            <div>
                <p>Здесь можно будет добавить данные в базу данных </p>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type='text' 
                        name='todo'
                        value = {todo}
                        onChange={this.onChange}
                        placeholder='Добавить дело'
                    />
                    <button
                        type="submit">
                            Добавить
                    </button>
                </form>
                {error && <p>{error.message}</p>}
            </div>
        )
    }
}

const TodoAdd = compose(withFirebase)(TodoAddBase)

export default TodoAdd