import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TodoLists } from './TodoLists'
import { CreateTodoList } from './CreateTodoList'
import { AuthenticatedEditTodoList, TodoListIdProvider } from './EditTodoList';

export const Content = () => (
  <Routes>
    <Route path="/todo/new" element={<CreateTodoList />} />
    <Route path="/todo/:todoListId" element={<TodoListIdProvider />} />
    <Route path="/" element={<TodoLists />} />
  </Routes>
)
