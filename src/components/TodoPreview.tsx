import React, { useState } from 'react'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { useAuth0 } from '../utils/hooks'

export const TodoPreview = () => {

  const { loginWithRedirect } = useAuth0()

  const loginHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (loginWithRedirect) {
      return loginWithRedirect()
    }
  }
  
  const [todos, setTodos] = useState<TodoItem[]>( [
    { id: 1, name: 'Change the world', isComplete: false },
    { id: 2, name: 'Do something amazing', isComplete: true }
  ])

  const addTodo = (todo: TodoItem) => {
    setTodos([...todos, todo])
  }

  return (
    <>
      <TodoInput addTodo={addTodo} placeHolder="Make a list" />
      <TodoList todos={todos} setTodos={setTodos} />
      <button
        onClick={loginHandler}
        type="button" 
        className="bg-teal-500 text-white p-4 rounded mx-auto block mt-10"
      >
        Login to get started
      </button>
    </>
  )
}
