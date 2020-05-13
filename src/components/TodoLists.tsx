import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { TodoListLink } from './TodoListLink'
import { TodoList } from '../models/TodoList'

interface ITodoListProps {
  className?: string
  lists: TodoList[]
}

export const TodoLists = (props: ITodoListProps) => {
  return (
    <>
      <Link className="block flex align-items-center mt-8" to="/todo">
        <span className="fa-layers fa-fw fa-3x block m-auto">
          <FontAwesomeIcon icon={faCircle} className="text-teal-500" />
          <FontAwesomeIcon icon={faPlus} inverse transform="shrink-8" />
        </span>
      </Link>
      
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto mt-8 border border-gray-300">
        <ul>
          {props.lists.map((list, i) => (
            <TodoListLink key={list.id} todoList={list.name} className={classNames({ 'border-t': !!i })} />
          ))}
        </ul>
      </div>
    </>
  )
}
