import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Nav} from "./components/Nav";
import {Main} from "./components/Main";

const App = () => (
  <Router>
    <Nav/>
    <Main/>
  </Router>
)

export default App;
