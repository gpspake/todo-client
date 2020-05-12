import React from 'react'
import { Router } from 'react-router-dom'
import { useAuth0 } from './utils/hooks'
import { Main } from './components/Main'
import { Nav } from './components/Nav'
import history from './utils/history'
import './tailwind.generated.css'

function App() {
  const { isAuthenticated, loading } = useAuth0()

  if (loading === undefined && isAuthenticated === undefined) {
    return <div>Loading...</div>
  }

  return (
    <Router history={history}>
      <Nav />
      {!loading && (
        <>
          {isAuthenticated && <Main />}
          {!isAuthenticated && <p>Log in</p>}
        </>
      )}
    </Router>
  )
}

export default App
