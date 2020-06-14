import { queryCache, useMutation, useQuery } from 'react-query'
import {
  addTodoItem,
  addTodoList,
  deleteTodoItem,
  deleteTodoList,
  fetchTodoList, 
  fetchTodoLists,
  updateTodoItem,
  updateTodoList
} from './todo-api-client'
import { TodoList } from '../models/TodoList'

export const useFetchTodoLists = () => useQuery('todoLists', fetchTodoLists)

export const useDeleteTodoList = () => useMutation(
  deleteTodoList,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries('todoLists')
    }
  }
)

export const useDeleteTodoItem = () => useMutation(
  deleteTodoItem,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList'])
    }
  }
)

export const useUpdateTodoItem = () => useMutation(
  updateTodoItem,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList'])
    }
  }
)

export const useAddTodoItem = (todoList: TodoList) => useMutation(
  addTodoItem,
  {
    onSuccess: savedTodoItem => {
      const todoItems = [...todoList.todoItems, savedTodoItem]
      queryCache.setQueryData(
        ['todoList', savedTodoItem.todoListId], 
        { ...todoList, todoItems })
    }
  }
)

export const useUpdateTodoList = () => useMutation(
  updateTodoList,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList'])
    }
  }
)

export const useFetchTodoList = (todoListId: number) => useQuery(
  ['todoList', todoListId],
  () => fetchTodoList(todoListId)
)

export const useAddTodoList = () => useMutation(
  addTodoList,
  {
    onSuccess: async savedTodoList => {
      await queryCache.setQueryData(['todoList', savedTodoList.id], savedTodoList)
    }
  }
)