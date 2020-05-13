import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TodoItem } from '../models/TodoItem'
import { TodoLists } from './TodoLists'
import { EditTodoList } from './EditTodoList'
import { TodoList } from '../models/TodoList'

export const Content = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([
    { 
      id: 1,
      name: 'May, 1 2020',
      todos: [
        { id: 1, name: 'Change the world', isComplete: false },
        { id: 2, name: 'Do something amazing', isComplete: true },
        { id: 3, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', isComplete: false },
      ]
    },
    {
      id: 2,
      name: 'Chores',
      todos: [
        { id: 4, name: 'Walk the dog', isComplete: false },
        { id: 5, name: 'Get groceries', isComplete: true }
      ]
    },
    {
      id: 3,
      name: 'Work Project',
      todos: [
        { id: 6, name: 'Create report', isComplete: false }
      ]
    }
  ])
  
  
  const [todos, setTodos] = useState<TodoItem[]>( [
    { id: 1, name: 'Change the world', isComplete: false },
    { id: 2, name: 'Do something amazing', isComplete: true },
    { id: 3, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', isComplete: false },
  ])

  const addTodo = (todo: TodoItem) => {
    setTodos([...todos, todo])
  }

  return (
    <Switch>
      <Route path="/todo">
        <EditTodoList todos={todos} setTodos={setTodos} addTodo={addTodo} />
      </Route>
      <Route path="/">
        <TodoLists lists={todoLists} />
      </Route>
    </Switch>
  )
}
