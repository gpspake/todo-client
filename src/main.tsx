import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth0Provider } from './utils/react-auth0-wrapper'
import history from './utils/history'

const onRedirectCallback = (appState?: { targetUrl: string; }) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      client_id={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      redirect_uri={window.location.origin}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE as string}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
