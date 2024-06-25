import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Tooltip } from 'react-tooltip'
import { TodoList } from '../models/TodoList'

interface ITodoListItemProps {
  todoList: TodoList
}

export const TodoListProgress = (props: ITodoListItemProps) => {
  const { todoList } = props

  const todoCount = todoList.todoItems.length
  const completedTodoCount = todoList.todoItems.filter(
    todo => todo.isComplete
  ).length
  const todoPercent = Math.round(completedTodoCount / todoCount * 100)
  const serializedStats = JSON.stringify({ 
    todoCount, 
    completedTodoCount, 
    todoPercent 
  })
  
  const styles = {
    rotation: 0.25,
    strokeLinecap: 'butt',
    pathTransitionDuration: 0.5,
    pathColor: `rgb(56, 178, 172, ${todoPercent / 100})`,
    trailColor: '#d6d6d6'
  }

  return (
    <>
      <span data-tip={serializedStats} data-for='toolTip'>
        <CircularProgressbar
          value={todoPercent}
          className="w-6 ml-2"
          styles={buildStyles(styles)}
          strokeWidth={30}
        />
      </span>

      <Tooltip
        id='toolTip'
        backgroundColor="white"
        border
        borderColor="#e2e8f0"
        getContent={(dataTip) => {
          const stats = JSON.parse(dataTip)
          return (
            <>
              {!!stats && (
                <>
                  <CircularProgressbar
                    value={stats.todoPercent}
                    className="w-20 mx-auto mb-4"
                    styles={buildStyles({
                      ...styles,
                      pathColor: '#38b2ac'
                    })}
                    strokeWidth={30}
                  />
                  <p className="text-gray-600 text-light">
                    {stats.completedTodoCount} of {stats.todoCount} complete
                  </p>
                </>
              )}
            </>
          )
        }}
      />
    </>
  )
}