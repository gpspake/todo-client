import axios from 'axios'
import { TodoList } from '../models/TodoList'
import { TodoItem } from '../models/TodoItem'

export const fetchTodoLists = async (): Promise<TodoList[]> => {
  const { data } = await axios.get(
    '/api/TodoLists'
  )
  return data
}

export const fetchTodoList = async (todoListId: number): Promise<TodoList> => {
  const { data } = await axios.get(
    `/api/TodoLists/${todoListId}`
  )
  return data
}

export const addTodoItem = async (todoItem: TodoItem): Promise<TodoItem> => {
  const { data } = await axios.post(
    '/api/TodoItems',
    todoItem
  )
  return data
}

export const updateTodoItem = async (todoItem: TodoItem) => {
  const { data } = await axios.put(
    `/api/TodoItems/${todoItem.id}`,
    todoItem
  )
  return data
}

export const deleteTodoItem = async (todoItemId: number): Promise<TodoList> => {
  const { data } = await axios.delete(
    `/api/TodoItems/${todoItemId}`
  )
  return data
}

export const addTodoList = async (todoList: TodoList): Promise<TodoList> => {
  const { data } = await axios.post(
    '/api/TodoLists',
    todoList
  )
  return data
}

export const updateTodoList = async (todoList: TodoList): Promise<TodoList> => {
  const { data } = await axios.put(
    `/api/TodoLists/${todoList.id}`,
    todoList
  )
  return data
}

export const deleteTodoList = async (todoListId: number): Promise<TodoList> => {
  const { data } = await axios.delete(
    `/api/TodoLists/${todoListId}`
  )
  return data
}
