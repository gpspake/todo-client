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

export const useFetchTodoList = (todoListId: number|string) => useQuery(
  ['todoList', todoListId],
  () => fetchTodoList(+todoListId)
)

export const useUpdateTodoList = () => useMutation(
  updateTodoList,
  {
    onSuccess: async (updatedTodoList: TodoList) => {
      const todoLists = queryClient.getQueryData(['todoLists']) as TodoList[]

      const index = todoLists.findIndex(todoList => {
        return todoList.id === updatedTodoList.id;
      });

      const updatedTodoLists = [
        ...todoLists.slice(0, index),
        updatedTodoList,
        ...todoLists.slice(index + 1),
      ]

      queryClient.setQueryData(
        ['todoList', updatedTodoList.id],
        updatedTodoList
      )

      queryClient.setQueryData(
        ['todoLists'],
        updatedTodoLists
      )
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

export const useAddTodoItem = () => useMutation(
  addTodoItem,
  {
    onSuccess: savedTodoItem => {
      const todoList = queryClient.getQueryData(['todoList', savedTodoItem.todoListId]) as TodoList
      const todoItems = [...todoList.todoItems, savedTodoItem]
      queryClient.setQueryData(
        ['todoList', savedTodoItem.todoListId],
        { ...todoList, todoItems }
      )
    }
  }
)

export const useUpdateTodoItem = () => useMutation(
  updateTodoItem,
  {
    onSuccess: async (updatedTodoItem) => {
      await queryClient.refetchQueries(['todoList', updatedTodoItem.todoListId])
    }
  }
)

export const useDeleteTodoItem = () => useMutation(
  deleteTodoItem,
  {
    onSuccess: async (todoListId) => {
      await queryClient.refetchQueries(['todoList', todoListId])
    }
  }
)
