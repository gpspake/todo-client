import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from './utils/react-auth0-wrapper'
import history from './utils/history'

const onRedirectCallback = (appState?: { targetUrl: string; }) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const todoListsContext = {
  todoLists: [
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
}

ReactDOM.render(
  <React.StrictMode>
    
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      redirect_uri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE as string}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
