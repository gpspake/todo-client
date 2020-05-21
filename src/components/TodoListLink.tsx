import React, { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { queryCache, useMutation } from 'react-query'
import { TodoList } from '../models/TodoList'
import { TodoListProgress } from './TodoListProgress'

interface ITodoListItemProps {
  todoList: TodoList
  deleteTodoList: (todoListId: number) => Promise<TodoList>
  className?: string
}

export const TodoListLink = (props: ITodoListItemProps) => {
  const { todoList, className, deleteTodoList } = props
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const [mutate] = useMutation(deleteTodoList, {
    onSuccess: () => {
      queryCache.refetchQueries('todoLists')
    }
  })
  
  const onDeleteTodoList = async (e: React.MouseEvent) => {
    // Prevent the form from refreshing the page
    e.preventDefault()

    try {
      await mutate(todoList.id)
      // TodoItem was successfully deleted
    } catch (error) {
      // Uh oh, something went wrong
    }
  }
  
  return (
    <li className={className}>
      <div className="relative w-100 group">
        <div className=" inset-0 flex items-center">
          <TodoListProgress todoList={todoList} />

          {confirmDelete && (
            <>
              <p className="ml-4 text-pink-700  py-3">Are you sure?</p>
              <div className="ml-auto inline-flex px-4">
                <button
                  onClick={onDeleteTodoList}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-gray-300 hover:text-pink-700 mr-4"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-gray-300 hover:text-gray-500"
                >
                  No
                </button>
              </div>
            </>
          )}

          {!confirmDelete && (
            <>
              <Link
                to={`/todo/${todoList.id}`}
                className={classNames(
                  'ml-4 font-light text-gray-600 hover:text-teal-500 w-full py-3'
                )}
              >
                {todoList.name}
              </Link>
              <div className="ml-auto inline-flex px-4  py-2">
                <button
                  onClick={() => {setConfirmDelete(true)}}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-white group-hover:text-gray-300"
                >
                  <FontAwesomeIcon
                    className="transition-all duration-200 ease-in-out hover:text-pink-700"
                    icon={faTrash}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  )
}