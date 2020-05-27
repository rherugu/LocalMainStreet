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
import QRCodejs from "./QRCode";
import Success from "./Success";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";
import fourofour from "./fourofour";
import ForgotPass from "./ForgotPass";
// import FullMap from "./FullMap";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/Home" render={(props) => <Home {...props} />} />
          <Route exact path="/Shop" render={(props) => <Shop {...props} />} />
          <Route exact path="/About" render={(props) => <About {...props} />} />
          <Route
            exact
            path="/Contact"
            render={(props) => <Contact {...props} />}
          />

          <Route
            exact
            path="/CustomerLogin"
            render={(props) => <CustomerLogin {...props} />}
          />
          <Route exact path="/Login" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/BusinessLogin"
            render={(props) => <BusinessLogin {...props} />}
          />
          <Route exact path="/Buy" render={(props) => <Buy {...props} />} />
          <Route
            exact
            path="/Dashboard"
            render={(props) => <Dashboard {...props} />}
          />
          <Route
            exact
            path="/QRCode"
            render={(props) => <QRCodejs {...props} />}
          />
          <Route
            exact
            path="/Success"
            render={(props) => <Success {...props} />}
          />
          <Route
            exact
            path="/TermsOfUse"
            render={(props) => <TermsOfUse {...props} />}
          />
          <Route
            exact
            path="/PrivacyPolicy"
            render={(props) => <PrivacyPolicy {...props} />}
          />
          <Route
            exact
            path="/ForgotPass"
            render={(props) => <ForgotPass {...props} />}
          />
          {/* <Route
            exact
            path="/FullMap"
            render={(props) => <FullMap {...props} />}
          /> */}
          <Route component={fourofour} />
        </Switch>
      </Router>
    );
  }
}

export default App;
