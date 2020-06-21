import React from 'react';
import './App.css';
import TreeStructure from './TreeStructure';
import Login from './Login';
import { PrivateRouter } from './PrivateRouter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <PrivateRouter path="/treeView" component={TreeStructure}>
            </PrivateRouter>
          </Switch>

        </Router>
      </header>
    </div >
  );
}

export default App;
