import React, { useState } from 'react'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { TodoListName } from './TodoListName'

export const PreviewTodoList = () => {

  const [todoList, setTodoList] = useState({
    id: 0,
    name: 'Create Beautiful Lists',
    todoItems: [
      {
        id: 1,
        name: 'Do something awesome',
        isComplete: true,
        todoListId: 0
      },
      {
        id: 2,
        name: 'Accomplish your goals',
        isComplete: false,
        todoListId: 0
      },
      {
        id: 3,
        name: 'Change the world',
        isComplete: false,
        todoListId: 0
      }
    ]
  })

  const addTodoItem = (todoItem: TodoItem) => {
    const todoItems = [...todoList.todoItems, todoItem]
    setTodoList({ ...todoList, todoItems })
  }

  const setTodoListName = (name: string) => {
    setTodoList({ ...todoList, name })
  }

  const updateTodoItem = (todoItem: TodoItem) => {
    return todoItem
  }

  const deleteTodoItem = (todoItemId: number) => {
    return todoItemId
  }

  return (
    <div className="mt-20">
      <TodoListName
        todoListName={todoList.name}
        setTodoListName={setTodoListName}
      />
      <TodoInput addTodoItem={addTodoItem} />
      <TodoList
        todoItems={todoList.todoItems}
        updateTodoItem={updateTodoItem}
        deleteTodoItem={deleteTodoItem}
      />
    </div>
  )
}
