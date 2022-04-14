import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Nav} from "./components/Nav";
import {Main} from "./components/Main";
import { useAuth } from './providers/auth';

function App() {

  const { isAuthenticated, isLoading, isTokenSet} = useAuth();

  return (
    <Router>
      <Nav/>
      {!isLoading && isAuthenticated && isTokenSet && <Main/>}
    </Router>
  );
}

export default App;
