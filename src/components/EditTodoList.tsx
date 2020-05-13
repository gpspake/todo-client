import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'

interface ITodoListProps {
  todos: TodoItem[]
  setTodos: (todos: TodoItem[]) => void
  addTodo: (todo: TodoItem) => void
}

export const EditTodoList = (props: ITodoListProps) => {

  const { todos, setTodos, addTodo } = props
  
  return (
    <>
      <Link className="block flex align-items-center mt-8" to="/">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon 
            icon={faCircle} 
            className="text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600" 
          />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </Link>

      <div className="text-center text-teal-500  mt-5 ">
        <button type="button" className="font-thin text-4xl group relative">
          <h1 className="inline hover:text-teal-600">Todo List</h1>
          <FontAwesomeIcon 
            icon={faEdit} 
            className="ml-2 absolute bottom-0 top-0 m-auto text-white group-hover:text-teal-600 transition-all duration-200 ease-in-out"
            transform="shrink-4"
          />
        </button>
      </div>

      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}
