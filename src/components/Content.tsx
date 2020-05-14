import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { TodoLists } from './TodoLists'
import { EditTodoList } from './EditTodoList'
import { CreateTodoList } from './CreateTodoList'

export const Content = () => {
  return (
    <Switch>
      <Route path="/todo/new">
        <CreateTodoList />
      </Route>
      <Route path="/todo/:todoListId">
        <EditTodoList />
      </Route>
      <Route path="/">
        <TodoLists />
      </Route>
    </Switch>
  )
}
