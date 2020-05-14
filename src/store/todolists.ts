import { createContext } from 'react'

export const todoLists = [
  {
    id: 1,
    name: 'May, 1 2020',
    todos: [
      { id: 1, name: 'Change the world', isComplete: false },
      { id: 2, name: 'Do something amazing', isComplete: true },
      { id: 3, name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', isComplete: false },
    ]
  },
  {
    id: 2,
    name: 'Chores',
    todos: [
      { id: 4, name: 'Walk the dog', isComplete: false },
      { id: 5, name: 'Get groceries', isComplete: true }
    ]
  },
  {
    id: 3,
    name: 'Work Project',
    todos: [
      { id: 6, name: 'Create report', isComplete: false }
    ]
  }
]

export const TodoListsContext = createContext(todoLists)