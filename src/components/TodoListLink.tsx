import React, { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

interface ITodoListItemProps {
  todoList: string
  className?: string
}

export const TodoListLink = (props: ITodoListItemProps) => {
  const { todoList, className } = props
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <li className={className}>
      <div className="relative w-100 group">
        <div className=" inset-0 flex items-center">
          {!confirmDelete && (
            <Link
              to="/todo"
              className={classNames(
                'ml-4 font-light text-center hover:text-teal-500 w-full py-2'
              )}
            >
              {todoList}
            </Link>
          )}

          {confirmDelete && (
            <>
              <p className="ml-4 text-pink-700  py-2">Are you sure?</p>
              <div className="ml-auto inline-flex px-4">
                <button
                  onClick={()=>{}}
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
          )}
        </div>
      </div>
    </li>
  )
}