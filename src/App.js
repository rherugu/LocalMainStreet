import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Component from "@reactions/component";
import Home from "./Home";
import Shop from "./Shop";
import About from "./About";
import Contact from "./Contact";
import CustomerLogin from "./CustomerLogin";
import Login from "./Login";
import BusinessLogin from "./BusinessLogin";
import Buy from "./Buy";
import Dashboard from "./Dashboard";

//prettier-ignore
class App extends Component {
  render(){
    return (
          <Router>
            <Switch>
            <Route
                exact
                path="/"
                render={props =>(
                    <Home {...props} />
                  )
                }
              />
              <Route
                exact
                path="/Shop"
                render={props =>(
                    <Shop  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/About"
                render={props =>
                  (
                    <About  {...props} />
                  )
                }
                
              />
              <Route
                exact
                path="/Contact"
                render={props =>(
                    <Contact  {...props} />
                  )
                }
              />

              <Route
                exact
                path="/CustomerLogin"
                render={props =>(
                    <CustomerLogin  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/Login"
                render={props =>(
                    <Login  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/BusinessLogin"
                render={props =>(
                    <BusinessLogin  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/Buy"
                render={props =>(
                    <Buy  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/Dashboard"
                render={props =>(
                    <Dashboard  {...props} />
                  )
                }
              />

            </Switch>
          </Router>
    );
  }
}

export default App;
