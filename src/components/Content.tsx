import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { TodoLists } from './TodoLists'
import { EditTodoList } from './EditTodoList'


export const Content = () => {
  return (
    <Switch>
      <Route path="/todo/:todoListId">
        <EditTodoList />
      </Route>
      <Route path="/">
        <TodoLists />
      </Route>
    </Switch>
  )
}
