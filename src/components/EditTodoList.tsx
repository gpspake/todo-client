import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch, faList } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { TodoListName } from './TodoListName'
import {
  useAddTodoItem,
  useDeleteTodoItem,
  useFetchTodoList,
  useUpdateTodoItem,
  useUpdateTodoList
} from '../utils/todo-hooks'

export const EditTodoList = () => {
  type TodoListParams = { todoListId: string }
  const { todoListId: todoListIdParam } = useParams<TodoListParams>()
  return todoListIdParam && <EditTodoListForm todoListId={+todoListIdParam} />
}

type EditTodoListFormProps = {
  todoListId: number
}

export const EditTodoListForm = (props: EditTodoListFormProps) => {
  const {todoListId} = props
  const { status, data: todoList } = useFetchTodoList(todoListId)
  const { mutateAsync: _deleteTodoItem} = useDeleteTodoItem()
  const { mutateAsync: _updateTodoItem} = useUpdateTodoItem()
  const { mutateAsync: _addTodoItem} = useAddTodoItem(todoList!)
  const { mutateAsync: _updateTodoList} = useUpdateTodoList()

  const addTodoItem = async (todoItem: TodoItem) => {
    await _addTodoItem({ ...todoItem, todoListId })
  }

  const setTodoListName = async (name: string) => {
    await _updateTodoList({ ...todoList!, name })
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

      {status !== 'success' && (
        <FontAwesomeIcon
          icon={faCircleNotch}
          size="2x"
          spin
          className="block mx-auto mt-8 text-teal-500"
        />
      )}

      {!!todoList && (
        <>
          <TodoListName
            todoListName={todoList.name}
            setTodoListName={setTodoListName}
          />
          <TodoInput addTodoItem={addTodoItem} />
          <TodoList
            todoItems={todoList.todoItems}
            updateTodoItem={_updateTodoItem}
            deleteTodoItem={_deleteTodoItem}
          />
        </>
      )}
    </>
  )
}
