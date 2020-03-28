import React from 'react';
import logo from './logo.svg';

import { Button, Image, Tab, TabNavigation, Pane, Tablist, SidebarTab, 
Paragraph } from 'evergreen-ui';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Component from "@reactions/component";
import Home from './Home';
import Shop from './Shop';
import About from './About';
import Contact from './Contact';
import CustomerLogin from './CustomerLogin';
import Login from './Login';
import BusinessLogin from'./BusinessLogin';
import BR2 from './BR2';
import BR3 from './BR3';
import BR4 from './BR4';
import BR5 from './BR5';
import BR6 from './BR6';


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
                path="/BR2"
                render={props =>(
                    <BR2  {...props} />
                  )
                }
              />  
              <Route
                exact
                path="/BR3"
                render={props =>(
                    <BR3  {...props} />
                  )
                }
              /> 
              <Route
                exact
                path="/BR4"
                render={props =>(
                    <BR4  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/BR5"
                render={props =>(
                    <BR5  {...props} />
                  )
                }
              />
              <Route
                exact
                path="/BR6"
                render={props =>(
                    <BR6  {...props} />
                  )
                }
              />
              {/* <Route path="/">
                <Home />
              </Route>
              <Route path="/Shop">
                <Shop />
              </Route>
              <Route path="/About">
                <About />
              </Route>
              <Route path="/Contact">
                <Contact />
              </Route> */}
            </Switch>
          </Router>
    );
  }
}

export default App;
