import { queryCache, useMutation, useQuery } from 'react-query'
import {
  addTodoItem, addTodoList,
  deleteTodoItem,
  deleteTodoList,
  fetchTodoList,
  updateTodoItem,
  updateTodoList
} from './todo-api-client'

export const useDeleteTodoListMutation = () => useMutation(
  deleteTodoList,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries('todoLists')
    }
  }
)

export const useDeleteTodoItemMutation = () => useMutation(
  deleteTodoItem,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList'])
    }
  }
)

export const useUpdateTodoItemMutation = () => useMutation(
  updateTodoItem,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList'])
    }
  }
)

export const useAddTodoItemMutation = (_todoListId: number) => useMutation(
  addTodoItem,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList', _todoListId])
    }
  }
)

export const useUpdateTodoListMutation = () => useMutation(
  updateTodoList,
  {
    onSuccess: async () => {
      await queryCache.refetchQueries(['todoList'])
    }
  }
)

export const useFetchTodoListsQuery = (_todoListId: number) => useQuery(
  ['todoList', _todoListId],
  () => fetchTodoList(_todoListId)
)

export const useAddTodoListMutation = () => useMutation(addTodoList)