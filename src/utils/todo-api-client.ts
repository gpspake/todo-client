import axios from 'axios'
import { TodoList } from '../models/TodoList'
import { TodoItem } from '../models/TodoItem'

export const fetchTodoLists = async (): Promise<TodoList[]> => {
  try {
    const { data } = await axios.get(
      '/api/TodoLists'
    )
    return data
  } catch (error) {
    return error
  }
}

export const fetchTodoList = async (todoListId: number): Promise<TodoList> => {
  try {
    const { data } = await axios.get(
      `/api/TodoLists/${todoListId}`
    )
    return data
  } catch (error) {
    return error
  }
}

export const addTodoItem = async (todoItem: TodoItem): Promise<TodoItem> => {
  try {
    const { data } = await axios.post(
      '/api/TodoItems',
      todoItem
    )
    return data
  } catch (addTodoListError) {
    return addTodoListError
  }
}

export const updateTodoItem = async (todoItem: TodoItem) => {
  try {
    const { data } = await axios.put(
      `/api/TodoItems/${todoItem.id}`,
      todoItem
    )
    return data
  } catch (addTodoListError) {
    return addTodoListError
  }
}

export const deleteTodoItem = async (todoItemId: number): Promise<TodoList> => {
  try {
    const { data } = await axios.delete(
      `/api/TodoItems/${todoItemId}`
    )
    return data
  } catch (deleteTodoListError) {
    return deleteTodoListError
  }
}

export const addTodoList = async (todoList: TodoList): Promise<TodoList> => {
  try {
    const { data } = await axios.post(
      '/api/TodoLists',
      todoList
    )
    return data
  } catch (addTodoListError) {
    return addTodoListError
  }
}

export const updateTodoList = async (todoList: TodoList): Promise<TodoList> => {
  try {
    const { data } = await axios.put(
      `/api/TodoLists/${todoList.id}`,
      todoList
    )
    return data
  } catch (deleteTodoListError) {
    return deleteTodoListError
  }
}

export const deleteTodoList = async (todoListId: number): Promise<TodoList> => {
  try {
    const { data } = await axios.delete(
      `/api/TodoLists/${todoListId}`
    )
    return data
  } catch (deleteTodoListError) {
    return deleteTodoListError
  }
}