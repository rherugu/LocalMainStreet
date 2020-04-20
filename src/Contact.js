import React from "react";

import logo from "./logo.svg";
import "./Contact.css";
import Component from "@reactions/component";

class Contact extends Component {
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
  render() {
    return (
      <div className="Contact">
        <header className="Contact-header">
          <div className="logoimgC">
            <img src={require("./Assets/LOGObg.png")}></img>
          </div>
          <div className="tabsC">
            <button class="btn" onClick={this.onClickHome}>
              <span>Home</span>
            </button>
            <br></br>
            <button class="btn" onClick={this.onClickShop}>
              <span>Shop</span>
            </button>
            <br></br>
            <button class="btn" onClick={this.onClickAbout}>
              <span>About</span>
            </button>
            <br></br>
            <button class="btn" onClick={this.onClickContact}>
              <span>Contact</span>
            </button>
            <br></br>
            <button class="btn" id=".dropbtn" onClick={this.onClickLogin}>
              <span>Login</span>
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default Contact;
