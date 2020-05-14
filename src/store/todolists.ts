import { createContext } from 'react'
import { TodoList } from '../models/TodoList'

interface ITodoListsContext {
  todoLists: TodoList[]
  setTodoLists: (updatedTodoLists: TodoList[]) => void,
  setTodoList: (index: number, todoList: TodoList) => void
}

const todoListsContext: ITodoListsContext = {
  todoLists: [],
  setTodoLists: (updatedTodoLists: TodoList[]) => {},
  setTodoList: (index: number, todoList: TodoList) => {}
}

export const TodoListsContext = createContext(todoListsContext)