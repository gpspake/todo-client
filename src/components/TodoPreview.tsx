import React, { useState } from 'react'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { useAuth0 } from '@auth0/auth0-react';

export const TodoPreview = () => {

  const { loginWithRedirect } = useAuth0()

  const loginHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (loginWithRedirect) {
      return loginWithRedirect()
    }
  }

  const [todoItems, setTodoItems] = useState<TodoItem[]>( [
    { id: 1, name: 'Change the world', isComplete: false, todoListId: 0 },
    { id: 2, name: 'Accomplish your goals', isComplete: false, todoListId: 0 },
    { id: 3, name: 'Do something amazing', isComplete: true, todoListId: 0 }
  ])

  const addTodo = (todo: TodoItem) => {
    setTodoItems([...todoItems, todo])
  }

  return (
    <>
      <TodoInput addTodoItem={addTodo} placeHolder="Create beautiful lists" />
      <TodoList
        todoItems={todoItems}
        updateTodoItem={() => undefined}
        deleteTodoItem={() => undefined}
      />
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
