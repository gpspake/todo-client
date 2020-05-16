import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList as TodoListComponent } from './TodoList'
import { TodoListsContext } from '../store/todolists'
import { TodoListName } from './TodoListName'

export const EditTodoList = () => {

  const { todoListId } = useParams()
  const { todoLists, setTodoList } = useContext(TodoListsContext)
  const todoListIndex = todoLists.findIndex(
    list => todoListId === list.id.toString()
  )
  const todoList = todoLists[todoListIndex]
  
  const setTodos = (todos: TodoItem[]) => {
    if(todoList) {
      const list = { ...todoList, todos }
      setTodoList(todoListIndex, list)
    }
  }
  
  const addTodo = (todo: TodoItem) => {
    const todos = [...todoLists[todoListIndex].todos, todo]
    const list = { ...todoList, todos }
    setTodoList(todoListIndex, list)
  }
  
  const setTodoListName = (name: string) => {
    setTodoList(todoListIndex, { ...todoList, name })
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

      <TodoListName 
        todoListName={todoList.name} 
        setTodoListName={setTodoListName} 
      />
      <TodoInput addTodo={addTodo} />
      <TodoListComponent 
        todos={todoList ? todoList.todos : []} 
        setTodos={setTodos} 
      />
    </>
  )
}
