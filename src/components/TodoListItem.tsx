import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextareaAutosize from 'react-textarea-autosize'
import { faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'

interface ITodoListItemProps {
  todoItem: TodoItem
  className?: string
  deleteTodoItem: (todoItemId: number) => void
  updateTodoItem: (todoItem: TodoItem) => void
}

export const TodoListItem = (props: ITodoListItemProps) => {
  
  const { todoItem, className, updateTodoItem, deleteTodoItem } = props
  const [editing, setEditing] = useState(false)
  const [isComplete, setIsComplete] = useState(todoItem.isComplete)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [name, setName] = useState(todoItem.name)
  
  const toggleIsComplete = () => {
    setIsComplete(!todoItem.isComplete)
    updateTodoItem({ 
      ...todoItem, 
      isComplete: !todoItem.isComplete 
    })
  }

  const updateTodoItemName = () => {
    updateTodoItem({ ...todoItem, name })
    toggleEditing()
  }
  
  const toggleEditing = () => {
    setEditing(!editing)
  }

  const onTodoItemNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value)
  }
  
  const cancelEditingTodoItemName = () => {
    setName(todoItem.name)
    toggleEditing()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const todoItemTextArea = document.getElementById(`todoItem-${todoItem.id}-input`)
    const isFocused = (document.activeElement === todoItemTextArea)
    
    if(isFocused) {
      if(event.key === 'Enter') {
        event.preventDefault()
        updateTodoItemName()
      }
      if(event.key === 'Escape') {
        event.preventDefault()
        cancelEditingTodoItemName()
      }
    }
  }
  
  const onConfirmDelete = async () => {
    await deleteTodoItem(todoItem.id)
  }

  return (
    <li className={`${className} todoItem-${todoItem.id}`}>
      <div className="relative w-100 group">
        <div className=" inset-0 flex items-center py-3">
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
                onChange={toggleIsComplete}
              />
              
              {!confirmDelete && (
                <>
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
                </>
              )}

              {confirmDelete && (
                <>
                  <p className="ml-4 text-pink-700">Are you sure?</p>
                  
                  <div className="ml-auto inline-flex px-4">
                    <button
                      onClick={onConfirmDelete}
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
            </>
          )}
          
          {editing && (
            <>
              <TextareaAutosize
                id={`todoItem-${todoItem.id}-input`}
                className="form-textarea block w-full border-0 resize-none focus:shadow-none p-0 ml-4"
                placeholder="Enter some long form content."
                value={name}
                onChange={onTodoItemNameChange}
                onKeyDown={handleKeyDown}
                inputRef={(node) => {
                  if (node) {
                    node.focus()
                  }
                }}
              />
              <div className="ml-auto inline-flex px-4">
                <button
                  onClick={cancelEditingTodoItemName}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-gray-300 hover:text-gray-500 mr-4"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                  onClick={updateTodoItemName}
                  type="button"
                  className="transition-all duration-200 ease-in-out text-gray-300 hover:text-teal-500"
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  )
}
