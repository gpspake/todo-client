import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Nav} from "./components/Nav";
import './tailwind.generated.css'
import {Main} from "./components/Main";
import { useAuth0 } from './utils/react-auth0-wrapper';

function App() {
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading === undefined && isAuthenticated === undefined) return <div>Loading...</div>

  return (
    <Router>
      <Nav/>
      {!isLoading && isAuthenticated && <Main/>}
    </Router>
  );
}

export default App;
