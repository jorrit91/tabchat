import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chatroom from './Components/Chatroom'
import Login from './Components/Login'

import './styles/main.scss';

function App() {
  return (
    <Router>
      <div className="page">
        <div className="pagecontainer">
          <Route exact path="/" component={Chatroom} />
          <Route exact path="/login" component={Login} />
        </div>
      </div>
    </Router>
  );
}

export default App;
