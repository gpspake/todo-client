import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { TodoListLink } from './TodoListLink'
import { TodoListsContext } from '../store/todolists'

export const TodoLists = () => {

  const { todoLists } = useContext(TodoListsContext)
  
  return (
    <>
      <Link className="block flex align-items-center mt-8 " to="/todo">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon 
            icon={faCircle} 
            className="transition-all duration-200 ease-in-out text-teal-500 group-hover:text-teal-600" 
          />
          <FontAwesomeIcon icon={faPlus} inverse transform="shrink-8" />
        </span>
      </Link>
      
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto mt-8 border border-gray-300">
        <ul>
          {todoLists.map((list, i) => (
            <TodoListLink 
              key={list.id} 
              todoList={list} 
              className={classNames({ 'border-t': !!i })} 
            />
          ))}
        </ul>
      </div>
    </>
  )
}
