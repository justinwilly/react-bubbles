import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/bubbles">
                Secret Bubs
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <PrivateRoute exact path="/bubbles" component={BubblePage} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;