import React, {useState} from 'react'
import TodosShow from '../TodosShow'
import TodoAdd  from '../TodoAdd'
import firebase from '../Firebase'
import { withAuthorization } from '../Session'
 
let uid = localStorage.getItem('uid')

const AccountPage = () => {
  const [JSXTodoShow, renderJSXTodoShow] = useState(
    <TodosShow
      key={Date.now()}
      firebase={firebase} 
      uid={uid} 
    />
  )

  const renderTodosShow = key => {
    let todo = JSON.parse(localStorage.getItem(key))
    localStorage.removeItem(key)
    renderJSXTodoShow(
      <TodosShow 
        key={Date.parse(todo.createdAt)} 
        firebase={firebase} 
        uid={uid} 
      />
    )
  }
    
  return (
      <div>
        <h1>Аккаунт</h1>
        <TodoAdd firebase={firebase} uid={uid} onAddTodo={key => renderTodosShow(key)}/>
        {JSXTodoShow}
      </div>
    )
}
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage)