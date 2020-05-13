import React, { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface ITodoListItemProps {
  todoList: string
  className?: string
}

export const TodoListLink = (props: ITodoListItemProps) => {
  const { todoList, className } = props
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)


  const toggleEditing = () => {
    setEditing(!editing)
  }

  return (
    <li className={className}>
      <div className="relative w-100 group">
        <div className=" inset-0 flex items-center py-2">
          {!editing && (
            <>
              {!confirmDelete && (
                <button
                  type="button"
                  className={classNames(
                    'ml-4 font-light text-center hover:text-teal-500 w-full'
                  )}
                  onClick={toggleEditing}
                >
                  {todoList}
                </button>
              )}
            </>
          )}

          {confirmDelete && (
            <p className="ml-4 text-pink-700">Are you sure?</p>
          )}

          {!editing && !confirmDelete && (
            <div className="ml-auto inline-flex px-4">
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