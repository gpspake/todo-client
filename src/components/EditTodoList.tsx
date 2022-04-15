import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch, faList } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList as TodoListComponent } from './TodoList'
import { TodoListName } from './TodoListName'
import {
  useAddTodoItem,
  useDeleteTodoItem,
  useFetchTodoList,
  useUpdateTodoItem,
  useUpdateTodoList
} from '../utils/todo-hooks'
import { TodoList } from '../models/TodoList';

export const EditTodoList = () => {
  type TodoListParams = { todoListId: string }
  const { todoListId: todoListIdParam } = useParams<TodoListParams>()

  if (todoListIdParam) {
    const { status, data: todoList } = useFetchTodoList(+todoListIdParam)

    return (
      <>
        {status !== 'success' && (
          <>
            <div className="block flex align-items-center mt-5">
              <span className="fa-fw fa-3x block m-auto group">
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  spin
                  className="text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600"
                />
              </span>
            </div>
          </>
        )}

        {status === 'success' && todoList && <EditTodoListForm todoList={todoList} />}
      </>
    )
  } else {
    return (
      <Link className="block flex align-items-center mt-8" to="/">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon
            icon={faCircle}
            spin
            className="text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600"
          />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </Link>
    )
  }
}

type EditTodoListFormProps = {
  todoList: TodoList
}

export const EditTodoListForm = (props: EditTodoListFormProps) => {
  const {todoList} = props
  const {id: todoListId} = todoList
  const { mutateAsync: _deleteTodoItem} = useDeleteTodoItem()
  const { mutateAsync: _updateTodoItem} = useUpdateTodoItem()
  const { mutateAsync: _addTodoItem} = useAddTodoItem(todoList)
  const { mutateAsync: _updateTodoList} = useUpdateTodoList()

  const addTodoItem = async (todoItem: TodoItem) => {
    await _addTodoItem({ ...todoItem, todoListId })
  }

  const setTodoListName = async (name: string) => {
    await _updateTodoList({ ...todoList, name })
  }

  return (
    <>
      {!!todoList && (
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
          <TodoInput addTodoItem={addTodoItem} />
          <TodoListComponent
            todoItems={todoList.todoItems}
            updateTodoItem={_updateTodoItem}
            deleteTodoItem={_deleteTodoItem}
          />
        </>
      )}
    </>
  )
}
