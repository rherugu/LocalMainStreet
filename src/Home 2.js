import React, { useState } from "react";
import logo from "./logo.svg";
import "./Home.css";
import Component from "@reactions/component";

import "react-tabs/style/react-tabs.css";
import "react-awesome-button/dist/styles.css";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Shop from "./Shop";

class Home extends Component {
  onClickHome = () => {
    this.props.history.push("/");
  };
  onClickShop = () => {
    this.props.history.push("/Shop");
  };
  onClickAbout = () => {
    this.props.history.push("/About");
  };
  onClickContact = () => {
    this.props.history.push("/Contact");
  };
  onClickLogin = () => {
    this.props.history.push("/login");
  };

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      bname: "",
      description: "",
      Address: "",
      mailSent: false,
      error: null,
      PhoneNumber: "",
      logins: false,
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <div className="logoimg">
            <img src={require("./Assets/LOGObg.png")}></img>
          </div>
          <div className="tabs">
            <button className="btn" onClick={this.onClickHome}>
              <span>Home</span>
            </button>
            <br></br>
            <button className="btn" onClick={this.onClickShop}>
              <span>Shop</span>
            </button>
            <br></br>
            <button className="btn" onClick={this.onClickAbout}>
              <span>About</span>
            </button>
            <br></br>
            <button className="btn" onClick={this.onClickContact}>
              <span>Contact</span>
            </button>
            <br></br>
            <button className="btn" id=".dropbtn" onClick={this.onClickLogin}>
              <span>Login</span>
            </button>
          </div>
        </header>
        <div className="bgcover">
          <br></br>
        </div>
      </div>
    );
  }
}

export default Home;
