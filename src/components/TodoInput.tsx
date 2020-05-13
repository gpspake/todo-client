import React, { useState } from 'react'
import { TodoItem } from '../models/TodoItem'

interface ITodoInputProps {
  addTodo: (todo: TodoItem) => void
  placeHolder?: string
}

export const TodoInput = (props: ITodoInputProps) => {
  
  const [name, setName] = useState()
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  
  const addTodo = () => {
    props.addTodo({ ...new TodoItem(), name })
    setName('')
  }
  
  return (
    <div className="flex items-center mx-auto justify-center md:py-0 border-gray-700 max-w-sm mt-5">
      <div className="flex flex-row rounded overflow-hidden w-full">
        <input
          className="py-3 px-4 text-gray-800 border-gray-300 border outline-none placeholder-gray-500 focus:bg-gray-100 w-full"
          type="text"
          name="email"
          placeholder={props.placeHolder || 'Walk the dog'}
          value={name}
          onChange={onChange}
        />
        <button
          onClick={addTodo}
          type="button"
          className="py-3 px-4 bg-teal-500 text-gray-100 hover:bg-teal-600"
        >
          Add
        </button>
      </div>
    </div>
  )
}
