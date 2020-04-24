import React from 'react';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Switch>

    </Router>
  );
}

export default App;
