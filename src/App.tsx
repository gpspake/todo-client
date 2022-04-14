import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Nav} from "./components/Nav";
import {Main} from "./components/Main";
import { useAuth } from './components/AuthProvider';

function App() {

  const { isAuthenticated, isLoading, isTokenSet} = useAuth();
  if (isLoading === undefined && isAuthenticated === undefined) return <div>Loading...</div>

  return (
    <Router>
      <Nav/>
      {!isLoading && isAuthenticated && isTokenSet && <Main/>}
    </Router>
  );
}

export default App;
