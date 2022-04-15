import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TodoLists } from './TodoLists'
import { CreateTodoList } from './CreateTodoList'
import { EditTodoList } from './EditTodoList';

export const Content = () => {
  return (
    <Routes>
      <Route path="/todo/new" element={<CreateTodoList />} />
      <Route path="/todo/:todoListId" element={<EditTodoList />} />
      <Route path="/" element={<TodoLists />} />
    </Routes>
  )
}
