import React, { useState } from 'react'
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
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}
