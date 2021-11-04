import { useMutation, useQuery } from 'react-query'

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
import { queryClient } from './query-client';

export const useFetchTodoLists = () => useQuery('todoLists', fetchTodoLists)


export const useAddTodoList = () => useMutation(
  addTodoList,
  {
    onSuccess: async savedTodoList => {
      await queryClient.setQueryData(['todoList', savedTodoList.id], savedTodoList)
    }
  }
)

export const useFetchTodoList = (todoListId: number) => useQuery(
  ['todoList', todoListId],
  () => fetchTodoList(todoListId)
)

export const useUpdateTodoList = () => useMutation(
  updateTodoList,
  {
    onSuccess: async () => {
      await queryClient.refetchQueries(['todoList'])
    }
  }
)

export const useDeleteTodoList = () => useMutation(
  deleteTodoList,
  {
    onSuccess: async () => {
      await queryClient.refetchQueries('todoLists')
    }
  }
)

export const useAddTodoItem = (todoList: TodoList) => useMutation(
  addTodoItem,
  {
    onSuccess: savedTodoItem => {
      const todoItems = [...todoList.todoItems, savedTodoItem]
      queryClient.setQueryData(
        ['todoList', savedTodoItem.todoListId],
        { ...todoList, todoItems })
    }
  }
)

export const useUpdateTodoItem = () => useMutation(
  updateTodoItem,
  {
    onSuccess: async () => {
      await queryClient.refetchQueries(['todoList'])
    }
  }
)

export const useDeleteTodoItem = () => useMutation(
  deleteTodoItem,
  {
    onSuccess: async () => {
      await queryClient.refetchQueries(['todoList'])
    }
  }
)
