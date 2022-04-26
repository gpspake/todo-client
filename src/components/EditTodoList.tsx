import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList as TodoListComponent } from './TodoList'
import { TodoListName } from './TodoListName'
import { TodoList } from '../models/TodoList'
import { Loading } from './Loading'
import { useAuth } from '../providers/auth'
import {
  useAddTodoItem,
  useDeleteTodoItem,
  useFetchTodoList,
  useUpdateTodoItem,
  useUpdateTodoList,
} from '../utils/todo-hooks'

export const EditTodoList = () => {
  type TodoListParams = { todoListId: string }
  const { todoListId: todoListIdParam } = useParams<TodoListParams>()
  const { isTokenSet } = useAuth();
  return (
    <>
      {isTokenSet && todoListIdParam && <AuthenticatedEditTodoList todoListId={+todoListIdParam}/>}
      {!isTokenSet && <Loading />}
    </>
  )
}

type AuthenticatedEditTodoListProps = {
  todoListId: number
}

export const AuthenticatedEditTodoList = (props: AuthenticatedEditTodoListProps) => {
  const { data: todoList } = useFetchTodoList(props.todoListId)
  const { mutateAsync: deleteTodoItem } = useDeleteTodoItem()
  const { mutateAsync: updateTodoItem } = useUpdateTodoItem()
  const { mutateAsync: addTodoItem } = useAddTodoItem()
  const { mutateAsync: updateTodoList } = useUpdateTodoList()

  const _addTodoItem = async (todoItem: TodoItem, todoListId: number) => {
    await addTodoItem({ ...todoItem, todoListId })
  };

  const setTodoListName = async (name: string, todoList: TodoList) => {
    await updateTodoList({ ...todoList, name })
  };

  return (
    <>
      {!!todoList && (
        <TodoListForm
          todoList={todoList}
          addTodoItem={(todoItem) => _addTodoItem(todoItem, todoList.id)}
          deleteTodoItem={deleteTodoItem}
          updateTodoItem={updateTodoItem}
          setTodoListName={(name) => setTodoListName(name, todoList)}
        />
      )}
      {!todoList && <Loading />}
    </>
  )
};

type TodoListFormProps = {
  todoList: TodoList
  deleteTodoItem: (todoItemId: number) => void
  updateTodoItem: (todoItem: TodoItem) => void
  addTodoItem: (todoItem: TodoItem) => void
  setTodoListName: (name: string) => void
}

export const TodoListForm = (props: TodoListFormProps) => {

  const {
    todoList,
    deleteTodoItem,
    updateTodoItem,
    addTodoItem,
    setTodoListName,
  } = props

  return (
    <>
      <Link className='block flex align-items-center mt-8' to='/'>
        <span className='fa-layers fa-fw fa-3x block m-auto group'>
          <FontAwesomeIcon
            icon={faCircle}
            className='text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600'
          />
          <FontAwesomeIcon icon={faList} inverse transform='shrink-8' />
        </span>
      </Link>
      <TodoListName
        todoListName={todoList.name}
        setTodoListName={setTodoListName}
      />
      <TodoInput addTodoItem={addTodoItem} />
      <TodoListComponent
        todoItems={todoList.todoItems}
        updateTodoItem={updateTodoItem}
        deleteTodoItem={deleteTodoItem}
      />
    </>
  );
};
