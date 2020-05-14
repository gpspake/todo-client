import React, { useState } from 'react'
import { Router } from 'react-router-dom'
import { useAuth0 } from './utils/hooks'
import { Main } from './components/Main'
import { Nav } from './components/Nav'
import { TodoPreview } from './components/TodoPreview'
import history from './utils/history'
import './tailwind.generated.css'
import { TodoListsContext } from './store/todolists'
import { TodoList } from './models/TodoList'
import { TodoItem } from './models/TodoItem'

function App() {
  const { isAuthenticated, loading } = useAuth0()

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

  if (loading === undefined && isAuthenticated === undefined) {
    return <div>Loading...</div>
  }
  
  const setTodoList = (todoListIndex: number, todoList: TodoList) => {
    setTodoLists([
      ...todoLists.slice(0, todoListIndex),
      todoList,
      ...todoLists.slice(todoListIndex+1, todoLists.length)
    ])
  }

  return (
    <TodoListsContext.Provider value={{ todoLists, setTodoLists, setTodoList }}>
      <Router history={history}>
        <Nav />
        {!loading && (
        <>
          {isAuthenticated && <Main />}
          {!isAuthenticated && <TodoPreview />}
        </>
        )}
      </Router>
    </TodoListsContext.Provider>
  )
}

export default App
