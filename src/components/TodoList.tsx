import React from 'react'
import classNames from 'classnames'
import { TodoListItem } from './TodoListItem'
import { TodoItem } from '../models/TodoItem'
import { Loading } from './Loading';

interface ITodoListProps {
  todoItems: TodoItem[]
  deleteTodoItem: (todoItemId: number) => void
  updateTodoItem: (todoItem: TodoItem) => void
}

export const TodoList = (props: ITodoListProps) => {

  const { todoItems, deleteTodoItem, updateTodoItem } = props

  return (
    <>
      {!todoItems && <Loading />}

      {!!todoItems && !!todoItems.length && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto my-8 border border-gray-300">
          <ul>
            {todoItems.map((todo, i) => (
              <TodoListItem
                key={todo.id+todo.name}
                todoItem={todo}
                className={classNames({ 'border-t': !!i })}
                deleteTodoItem={deleteTodoItem}
                updateTodoItem={updateTodoItem}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
