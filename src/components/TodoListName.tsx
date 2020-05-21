import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'

interface ITodoListItemProps {
  todoListName: string,
  setTodoListName: (todoListName: string) => void
}

export const TodoListName = (props: ITodoListItemProps) => {
  const [todoListName, setTodoListName] = useState(props.todoListName)
  const [editingTodoListName, setEditingTodoListName] = useState(false)

  const onTodoListNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTodoListName(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      saveTodoListName()
    }    
    if(event.key === 'Escape'){
      cancelEditTodoListName()
    }
  }

  const cancelEditTodoListName = () => {
    setTodoListName(props.todoListName)
    setEditingTodoListName(false)
  }

  const saveTodoListName = () => {
    props.setTodoListName(todoListName)
    setEditingTodoListName(false)
  }

  return (
    <div className="text-center text-teal-500 mt-5 ">
      {!editingTodoListName && (
        <button 
          type="button" 
          className="font-thin text-4xl group relative max-w-sm" 
          onClick={() => {setEditingTodoListName(true)}}
        >
          <h1 className="inline hover:text-teal-600 transition-all duration-200 ease-in-out">
            {todoListName}
            <FontAwesomeIcon
              icon={faEdit}
              className="absolute bottom-0 m-2 text-white group-hover:text-teal-600 transition-all duration-200 ease-in-out"
              transform="shrink-4"
            />
          </h1>
        </button>
      )}
      {editingTodoListName && (
        <div className="relative m-auto">
          <TextareaAutosize
            className="m-auto form-textarea block border-0 font-thin resize-none text-4xl focus:shadow-none p-0 text-center max-w-sm"
            placeholder="Enter a name for this list"
            value={todoListName}
            onChange={onTodoListNameChange}
            onKeyDown={handleKeyDown}
            inputRef={(node: HTMLTextAreaElement) => {
              if (node) {
                node.focus()
              }
            }}
          />
          <div className="mt-2">
            <button type="button" onClick={cancelEditTodoListName}>
              <FontAwesomeIcon
                icon={faTimes}
                className="m-auto right-0 text-gray-400 hover:text-gray-500 transition-all duration-200 ease-in-out"
                size="lg"
              />
            </button>
            <button type="button" onClick={saveTodoListName}>
              <FontAwesomeIcon
                icon={faSave}
                className="ml-4 m-auto right-0 text-gray-400 hover:text-teal-600 transition-all duration-200 ease-in-out"
                size="lg"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
