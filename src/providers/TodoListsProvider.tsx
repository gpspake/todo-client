import React, { createContext, useContext, ReactNode, useReducer } from 'react'
import { TodoList } from '../models/TodoList'

type Action = {type: 'setTodoLists', todoLists: TodoList[]}
type Dispatch = (action: Action) => void
type State = {todoLists: TodoList[]}
type TodolistsProviderProps = {children: ReactNode}

const TodoListsStateContext = createContext<State | undefined>(undefined)
const TodoListsDispatchContext = createContext<Dispatch | undefined>(undefined)

function todoListsReducer(state: State, action: Action) {

  switch (action.type) {

    case 'setTodoLists': {
      return { todoLists: action.todoLists }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function TodoListsProvider({ children }: TodolistsProviderProps) {

  const [state, dispatch] = useReducer(todoListsReducer, { todoLists: [] })

  return (
    <TodoListsStateContext.Provider value={state}>
      <TodoListsDispatchContext.Provider value={dispatch}>
        {children}
      </TodoListsDispatchContext.Provider>
    </TodoListsStateContext.Provider>
  )
}


function useTodoListsState() {

  const context = useContext(TodoListsStateContext)

  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }

  return context

}

function useTodoListsDispatch() {

  const context = useContext(TodoListsDispatchContext)

  if (context === undefined) {
    throw new Error('useTodoListsDispatch must be used within a TodoListsProvider')
  }

  return context

}

export { TodoListsProvider, useTodoListsState, useTodoListsDispatch }