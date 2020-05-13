import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'

export const Content = () => {
  const [todos, setTodos] = useState<TodoItem[]>( [
    { id: 1, name: 'Change the world', isComplete: false },
    { id: 2, name: 'Do something amazing', isComplete: true },
    { id: 3, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', isComplete: false },
  ])

  const addTodo = (todo: TodoItem) => {
    setTodos([...todos, todo])
  }

  return (
    <>
      <div className="block flex align-items-center mt-8">
        <span className="fa-layers fa-fw fa-3x block m-auto">
          <FontAwesomeIcon icon={faCircle} className="text-teal-500" />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </div>
      <div className="text-center text-teal-500 font-thin text-4xl mt-5">
        <h1>Todo List</h1>
      </div>
      
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}
