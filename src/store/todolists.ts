import { createContext } from 'react'
import { TodoList } from '../models/TodoList'

interface ITodoListsContext {
  todoLists: TodoList[]
  setTodoLists: (updatedTodoLists: TodoList[]) => void
  setTodoList: (index: number, todoList: TodoList) => void
  addTodoList: (todoList: TodoList) => number
}

const todoListsContext: ITodoListsContext = {
  todoLists: [],
  setTodoLists: (updatedTodoLists: TodoList[]) => {},
  setTodoList: (index: number, todoList: TodoList) => {},
  addTodoList: (todoList: TodoList) => 0
}

export const TodoListsContext = createContext(todoListsContext)