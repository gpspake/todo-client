import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
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
        <span className="fa-layers fa-fw fa-3x block m-auto">
          <FontAwesomeIcon icon={faCircle} className="text-teal-500" />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </Link>

      <div className="text-center text-teal-500 font-thin text-4xl mt-5">
        <h1>Todo List</h1>
      </div>

      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}
