import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from '../models/TodoList'
import { TodoListName } from './TodoListName'
import { useAddTodoList } from '../utils/todo-hooks'

export const CreateTodoList = () => {
  
  const [newTodoList, setNewTodoList] = useState(
    { ...new TodoList(), name: format(new Date(), 'PPPP') }
  )
  
  const [redirectToList, setRedirectToList] = useState(0)

  const { mutateAsync, status, data, error } = useAddTodoList()
  
  const addTodoItem = (todoItem: TodoItem) => {
    mutateAsync({
      ...newTodoList, 
      todoItems: [todoItem] 
    }).then(
      response => {
        setRedirectToList(response.id)
      }
    )
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
      <TodoInput addTodoItem={addTodoItem} />
    </>
  )
}
