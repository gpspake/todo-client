import React, { useState, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TodoItem } from '../models/TodoItem'
import { TodoLists } from './TodoLists'
import { EditTodoList } from './EditTodoList'
import { TodoList } from '../models/TodoList'
import { TodoListsContext } from '../store/todolists'


export const Content = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>(useContext(TodoListsContext))
  
  const [todoList, setTodoList] = useState<TodoList>({ 
    id: 4,
    name: 'Todo List Test',
    todos: [
      { id: 1, name: 'Change the world', isComplete: false },
      { id: 2, name: 'Do something amazing', isComplete: true },
      { id: 3, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', isComplete: false },
    ] 
  })

  const addTodo = (todo: TodoItem) => {
    const todos = [...todoList.todos, todo]
    setTodoList({ ...todoList, todos })
  }

  return (
    <Switch>
      <Route path="/todo">
        <EditTodoList 
          todoList={todoList} 
          setTodoList={setTodoList} 
          addTodo={addTodo} 
        />
      </Route>
      <Route path="/">
        <TodoLists lists={todoLists} />
      </Route>
    </Switch>
  )
}
