import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useDeleteTodoList, useFetchTodoLists } from '../utils/todo-hooks'
import {TodoListLink} from "./TodoListLink";

export const TodoLists = () => {

  const {
    // status: fetchTodoListsStatus,
    data: todoLists,
    // error: fetchTodoListsError
  } = useFetchTodoLists()

  const  { mutateAsync: deleteTodoListMutation} = useDeleteTodoList()

  return (
    <>
      <Link className="block flex align-items-center mt-8 " to="/todo/new">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon
            icon={faCircle}
            className="transition-all duration-200 ease-in-out text-teal-500 group-hover:text-teal-600"
          />
          <FontAwesomeIcon icon={faPlus} inverse transform="shrink-8" />
        </span>
      </Link>

      {todoLists && !!todoLists.length && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto mt-8 border border-gray-300">
          <ul>
            {todoLists.map((list, index) => (
              <TodoListLink
                key={list.id}
                todoList={list}
                deleteTodoList={deleteTodoListMutation}
                className={classNames({ 'border-t': !!index })}
              />
            ))}
          </ul>
        </div>
      )}
      {todoLists && !todoLists.length && (
        <p className="mt-6 text-center text-gray-500">Add a list</p>
      )}
    </>
  )
}
