import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList, faSave } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList as TodoListComponent } from './TodoList'
import { TodoListsContext } from '../store/todolists'


interface ITodoListProps {
  // todoList: TodoList
  // setTodoList: (todoList: TodoList) => void
  // addTodo: (todo: TodoItem) => void
}

export const EditTodoList = (props: ITodoListProps) => {

  const { todoListId } = useParams()
  const { todoLists, setTodoList } = useContext(TodoListsContext)
  const todoListIndex = todoLists.findIndex(
    list => todoListId === list.id.toString()
  )
  const todoList = todoLists[todoListIndex]

  
  // const { setTodoList, addTodo } = props
  const [todoListName, setTodoListName] = useState(todoList.name)
  const [editingTodoListName, setEditingTodoListName] = useState(false)
  
  const setTodos = (todos: TodoItem[]) => {
    if(todoList) {
      const list = { ...todoList, todos }
      setTodoList(todoListIndex, list)
    }
  }
  
  const onTodoListNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTodoListName(event.target.value)
  }
  
  const cancelEditTodoListName = () => {
    if(todoList) {
      setTodoListName(todoList.name)
    }
    setEditingTodoListName(false)
  }
  
  const saveTodoListName = () => {
    if(todoList) {
      const list = { ...todoList, name: todoListName }
      setTodoList(todoListIndex, list)
    }
    setEditingTodoListName(false)
  }
  
  const addTodo = (todo: TodoItem) => {
    const todos = [...todoLists[todoListIndex].todos, todo]
    const list = { ...todoList, todos }
    setTodoList(todoListIndex, list)
  }
  
  return (
    <>
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
              {todoListName}
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
              value={todoListName}
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
      <TodoListComponent 
        todos={todoList ? todoList.todos : []} 
        setTodos={setTodos} 
      />
    </>
  )
}
