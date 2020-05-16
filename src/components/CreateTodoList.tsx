import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from '../models/TodoList'
import { TodoListsContext } from '../store/todolists'
import { TodoListName } from './TodoListName'

export const CreateTodoList = () => {

  const { addTodoList } = useContext(TodoListsContext)
  const [newTodoList, setNewTodoList] = useState(
    { ...new TodoList(), name: format(new Date(), 'PPPP') }
  )
  const [redirectToList, setRedirectToList] = useState(0)
  
  const addTodo = (todo: TodoItem) => {
    const todoList = { ...newTodoList, todos: [todo] }
    const id = addTodoList(todoList)
    setRedirectToList(id)
  }
  
  const setTodoListName = (name: string) => {
    setNewTodoList({ ...newTodoList, name })
  }
  
  return (
    <>
      {!!redirectToList && <Redirect to={`/todo/${redirectToList}`} />}
      
      <Link className="block flex align-items-center mt-8" to="/">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600"
          />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </Link>
      
      <TodoListName 
        todoListName={newTodoList.name} 
        setTodoListName={setTodoListName} 
      />
      <TodoInput addTodo={addTodo} />
    </>
  )
}
