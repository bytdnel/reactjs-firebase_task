import React, { Component, useState, useEffect } from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'



const TodoList = ({promise}) => {
    const [todos, setTodos] = useState(null)
    useEffect(() => {
        promise.then(result => {
            setTodos(result)
        })
      })
    if (!todos) return(<p>Ждем данные из Firebase</p>)
    return (
        <ul>
            {todos.map(todo => <li>{todo.todo}</li>)}
        </ul>
    )
}

// const TodoListi = ({todos}) => {
//     console.log({todos})
//     const [JSXComponents, renderTodos] = React.useState()
//     if (!resolvedTodo) {
//         todos.then(result => {
//             let resolvedTodos = result.map(todo => {return <p>{todo.todo}</p>})
//             console.log('Receiver Data')
//             resolvedTodo = true
//             renderTodos(resolvedTodos)
//         })
//     } //else {
//         // renderTodos(<p>Ну че это победа</p>)
//         // todos.then(result => {
//         //     // console.log({result})
//         //     let resolvedTodos = result.map(todo => <p>{todo.todo}</p>)
//         //     renderTodos(resolvedTodos)
//         // })
//     // }

//     return(
//         <div>
//             {!resolvedTodo && <p>Подождите, данные еще не пришли из Firebase</p>}
//             {JSXComponents}
//             {[<p>Hello</p>, <p>Hi</p>]}
//         </div>
//     )
// }

let setTodos = async (fun, uid, toAddTodo) => {
    let todos = await fun(uid)
    if(todos) return todos
}


class TodosShowBase extends Component {
    constructor(props) {
        super(props)
        console.log({props})
    }
    

    render() { 
        return(
            <div>
                <TodoList promise={this.props.firebase.doGetTodos(this.props.uid)}/>
            </div>
        )
    }
}

const TodosShow = compose(withFirebase)(TodosShowBase)

export default TodosShow