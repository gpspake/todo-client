import {queryCache, useMutation, useQuery} from 'react-query'
import {
  addTodoItem, 
  addTodoList,
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

export const useAddTodoItemMutation = () => useMutation(
  addTodoItem,
  {
    onSuccess: async savedTodoItem => {
      await queryCache.refetchQueries(['todoList', savedTodoItem.todoListId])
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

export const useFetchTodoListQuery = (todoListId: number) => useQuery(
  ['todoList', todoListId],
  () => fetchTodoList(todoListId)
)

export const useAddTodoListMutation = () => useMutation(
  addTodoList,
  {
    onSuccess: async savedTodoList => {
      await queryCache.setQueryData(['todoList', savedTodoList.id], savedTodoList)
    }
  }
)