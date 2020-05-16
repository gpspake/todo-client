import React from 'react'
import classNames from 'classnames'
import { TodoListItem } from './TodoListItem'
import { TodoItem } from '../models/TodoItem'

interface ITodoListProps {
  todos: TodoItem[]
  setTodos: (todos: TodoItem[]) => void
}

export const TodoList = (props: ITodoListProps) => {
  
  const { todos, setTodos } = props
  
  return (
    <>
      {!!todos.length && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto my-8 border border-gray-300">
          <ul>
            {todos.map((todo, i) => {

              const setTodo = (updatedTodo: TodoItem) => {
                setTodos([
                  ...todos.slice(0, i),
                  updatedTodo,
                  ...todos.slice(i+1, )
                ])
              }

              const deleteTodo = () => {
                setTodos([
                  ...todos.slice(0, i),
                  ...todos.slice(i+1, )
                ])
              }

              return(
                <TodoListItem
                  key={todo.id+todo.name}
                  todo={todo}
                  className={classNames({ 'border-t': !!i })}
                  setTodo={setTodo}
                  deleteTodo={deleteTodo}
                />
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
