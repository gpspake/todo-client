import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { queryCache, useMutation, useQuery } from 'react-query'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList as TodoListComponent } from './TodoList'
import { TodoListName } from './TodoListName'
import { addTodoItem, fetchTodoList, updateTodoList } from '../utils/todo-api-client'

export const EditTodoList = () => {

  const { todoListId } = useParams()

  const [addTodoItemMutation] = useMutation(
    addTodoItem,
    {
      onSuccess: () => {
        queryCache.refetchQueries(['todoList', todoListId])
      }
    }
  )
  
  const [updateTodoListMutation] = useMutation(
    updateTodoList,
    {
      onSuccess: () => {
        queryCache.refetchQueries(['todoList'])
      }
    }
  )

  const { status, data: todoList } = useQuery(
    ['todoList', todoListId],
    () => fetchTodoList(todoListId)
  )

  const onAddTodoItem = async (todoItem: TodoItem) => {
    try {
      await addTodoItemMutation({
        ...todoItem,
        todoListId: parseInt(todoListId, 10)
      })
    } catch (error) {
      // Uh oh, something went wrong
    }
  }


  const setTodoListName = (name: string) => {
    if (todoList) {
      updateTodoListMutation({ ...todoList, name })
    }
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

      {status === 'success' && !!todoList && (
        <>
          <TodoListName
            todoListName={todoList.name}
            setTodoListName={setTodoListName}
          />
          <TodoInput onAddTodoItem={onAddTodoItem} />
          <TodoListComponent todoItems={todoList.todoItems} />
        </>
      )}
    </>
  )
}
