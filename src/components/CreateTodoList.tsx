import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList, faSave } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { format } from 'date-fns'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from '../models/TodoList'
import { TodoListsContext } from '../store/todolists'
import {Redirect} from 'react-router'

export const CreateTodoList = () => {

  const { addTodoList } = useContext(TodoListsContext)
  const [newTodoList, setNewTodoList] = useState(
    { ...new TodoList(), name: format(new Date(), 'PPPP') }
  )
  const [todoListNameRef, setTodoListNameRef] = useState(newTodoList.name)
  const [editingTodoListName, setEditingTodoListName] = useState(false)
  const [redirectToList, setRedirectToList] = useState(0)

  const onTodoListNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = event.target.value
    setNewTodoList({ ...newTodoList, name })
  }

  const cancelEditTodoListName = () => {
    setNewTodoList({ ...newTodoList, name: todoListNameRef })
    setEditingTodoListName(false)
  }

  const saveTodoListName = () => {
    setTodoListNameRef(newTodoList.name)
    setEditingTodoListName(false)
  }

  const addTodo = (todo: TodoItem) => {
    const todoList = { ...newTodoList, todos: [todo] }
    const id = addTodoList(todoList)
    setRedirectToList(id)
  }

  return (
    <>
      {redirectToList && <Redirect to={`/todo/${redirectToList}`} />}
      
      <Link className="block flex align-items-center mt-8" to="/">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600"
          />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </Link>

      <div className="text-center text-teal-500 mt-5 ">
        {!editingTodoListName && (
          <button type="button" className="font-thin text-4xl group relative" onClick={() => {setEditingTodoListName(true)}}>
            <h1 className="inline hover:text-teal-600">
              {newTodoList.name}
            </h1>
            <FontAwesomeIcon
              icon={faEdit}
              className="ml-2 absolute bottom-0 top-0 m-auto text-white group-hover:text-teal-600 transition-all duration-200 ease-in-out"
              transform="shrink-4"
            />
          </button>
        )}
        {editingTodoListName && (
          <div className="relative m-auto">
            <TextareaAutosize
              className="m-auto form-textarea block border-0 font-thin resize-none text-4xl focus:shadow-none p-0 text-center max-w-sm"
              placeholder="Enter a name for this list"
              value={newTodoList.name}
              onChange={onTodoListNameChange}
              inputRef={(node) => {
                if (node) {
                  node.focus()
                }
              }}
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={cancelEditTodoListName}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="m-auto right-0 text-gray-400 hover:text-gray-500 transition-all duration-200 ease-in-out"
                  size="lg"
                />
              </button>
              <button
                type="button"
                onClick={saveTodoListName}
              >
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

      <TodoInput addTodo={addTodo} />
    </>
  )
}
