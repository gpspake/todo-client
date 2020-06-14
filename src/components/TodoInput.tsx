import React, { useState } from 'react'
import classNames from 'classnames'
import { TodoItem } from '../models/TodoItem'

interface ITodoInputProps {
  addTodoItem: (todoItem: TodoItem) => void
  placeHolder?: string
}

export const TodoInput = (props: ITodoInputProps) => {
  
  const [name, setName] = useState('')
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const newTodoItemInputElement = document.getElementById('new-todo-item-input')
    const isFocused = (document.activeElement === newTodoItemInputElement)
    
    if(isFocused) {
      if(event.key === 'Enter') {
        event.preventDefault()
        onAddTodoItem()
      }
      if(event.key === 'Escape') {
        event.preventDefault()
        setName('')
      }
    }
  }
  
  const onAddTodoItem = () => {
    if(name.length) {
      props.addTodoItem({ ...new TodoItem(), name })
      setName('')
    }
  }
  
  return (
    <div className="flex items-center mx-auto justify-center md:py-0 border-gray-700 max-w-sm mt-5">
      <div className="flex flex-row rounded overflow-hidden w-full">
        <input
          id="new-todo-item-input"
          className="py-3 px-4 text-gray-800 border-gray-300 border outline-none placeholder-gray-500 focus:bg-gray-100 w-full"
          type="text"
          name="todo"
          placeholder={props.placeHolder || 'Walk the dog'}
          value={name}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          ref={(node) => {
            if (node) {
              node.focus()
            }
          }}
        />
        <button
          onClick={onAddTodoItem}
          type="button"
          className={classNames(
            { 'bg-gray-300 cursor-default': !name.length },
            { 'bg-teal-500 hover:bg-teal-600': !!name.length },
            'py-3 px-4 text-gray-100 transition-all duration-200 ease-in-out'
          )}
        >
          Add
        </button>
      </div>
    </div>
  )
}
