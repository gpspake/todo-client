import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextareaAutosize from 'react-textarea-autosize'
import { faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'

interface ITodoListItemProps {
  todo: TodoItem
  setTodo:(todo: TodoItem) => void
  deleteTodo:() => void
  className?: string
}

export const TodoListItem = (props: ITodoListItemProps) => {
  const { todo, className, setTodo, deleteTodo } = props
  const { isComplete } = todo
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [name, setName] = useState(todo.name)
  
  const toggleComplete = () => {
    setTodo({ ...todo, isComplete: !isComplete })
  }
  
  const toggleEditing = () => {
    setEditing(!editing)
  }

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value)
  }
  
  const cancelEditing = () => {
    setName(todo.name)
    toggleEditing()
  }

  return (
    <li className={className}>
      <div className="relative w-100 group">
        <div className=" inset-0 flex items-center py-2">
          {!editing && (
            <>
              <input
                disabled={confirmDelete}
                className={classNames(
                  { 'border-none': confirmDelete },
                  'leading-tight form-checkbox text-teal-500 inline-block align-middle ml-4'
                )}
                checked={isComplete}
                type="checkbox"
                onChange={toggleComplete}
              />
              {!confirmDelete && (
                <button
                  type="button"
                  className={classNames(
                    { 'line-through text-gray-500': isComplete },
                    { 'text-gray-600': !isComplete },
                    'ml-4 font-light text-left hover:text-teal-500'
                  )}
                  onClick={toggleEditing}
                >
                  {name}
                </button>
              )}
            </>
          )}
          
          {confirmDelete && (
            <p className="ml-4 text-pink-700">Are you sure?</p>
          )}
          
          {editing && (
            <>
              <TextareaAutosize
                className="form-textarea block w-full border-0 resize-none focus:shadow-none p-0 ml-4"
                placeholder="Enter some long form content."
                value={name}
                onChange={onChange}
                inputRef={(node) => {
                  if (node) {
                    node.focus()
                  }
                }}
              />
              <div className="ml-auto inline-flex px-4">
                <button
                  onClick={cancelEditing}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-gray-300 hover:text-gray-500 mr-4"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                  onClick={toggleEditing}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-gray-300 hover:text-teal-500"
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            </>
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

          {confirmDelete && (
            <div className="ml-auto inline-flex px-4">
              <button
                onClick={deleteTodo}
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
          )}
        </div>
      </div>
    </li>
  )
}