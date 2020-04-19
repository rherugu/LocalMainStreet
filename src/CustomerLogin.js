import React from "react";
import "./CustomerLogin.css";
import Component from "@reactions/component";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import "react-awesome-button/dist/styles.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const qs = require("querystring");

var res = "f";

class CustomerLogin extends Component {
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
  onClickCustomerLogin = () => {
    this.props.history.push("/CustomerLogin");
  };

  constructor(props) {
    super(props);
    this.message = "";
    this.state = {
      fname: "",
      lname: "",
      email: "",
      Password: "",
      displaymessage: "hidden",
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  onSubmitEventHandler = (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.Password,
      fname: this.state.fname,
      lname: this.state.lname,
    };

    axios
      .post("http://localhost:3000/posts/", payload)
      .then(function (response) {
        res = response.data;
        if (res === '"password" length must be at least 6 characters long') {
          res =
            "Password length is too short. It needs to be at least 6 characters long.";
        }
        if (res === '"email" length must be at least 6 characters long') {
          res = "Email is too short; needs to be at least 6 characters.";
        }
        if (res === '"email" must be a valid email') {
          res =
            "The email entered is not a valid email. Make sure to include the @ sign and the '.com, or .io, etc";
        }
        if (res === '"fname" is not allowed to be empty') {
          res = "Please enter your first name.";
        }
        if (res === '"lname" is not allowed to be empty') {
          res = "Please enter your last name.";
        }
        if (res === '"password" is not allowed to be empty') {
          res = "Please enter your password.";
        }
        if (res === '"email" is not allowed to be empty') {
          res = "Please enter your email.";
        }
        alert(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    this.state.displaymessage = "visible";
  };

  render() {
    console.log(res);
    return (
      <div className="CL">
        <header className="CL-header">
          <div className="tabsCL">
            <button class="btnCL" onClick={this.onClickHome}>
              <span>Home</span>
            </button>
            <br></br>
            <button class="btnCL" onClick={this.onClickShop}>
              <span>Shop</span>
            </button>
            <br></br>
            <button class="btnCL" onClick={this.onClickAbout}>
              <span>About</span>
            </button>
            <br></br>
            <button class="btnCL" onClick={this.onClickContact}>
              <span>Contact</span>
            </button>
            <br></br>
          </div>
          <br></br> <br></br>
          <big>
            <big>
              <h1 style={{ color: "#111111" }}>Register</h1>
            </big>
          </big>
          {/* <h3
            style={{
              color: "#111111",
              visibility: this.state.displaymessage
            }}
          >
            {res}
          </h3> */}
          <form>
            <label style={{ color: "#111111" }}>Choose an email</label>
            <br></br>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              style={{
                width: 560,
                height: 60,
                fontSize: 20,
                backgroundColor: "#DDDDDD",
              }}
              required
            />
            <br></br>

            <label style={{ color: "#111111" }}>Choose a Password</label>
            <br></br>
            <input
              type="text"
              id="Pass"
              name="Password"
              placeholder="Your Password"
              value={this.state.Password}
              onChange={(e) => this.setState({ Password: e.target.value })}
              style={{
                width: 560,
                height: 60,
                fontSize: 20,
                backgroundColor: "#DDDDDD",
              }}
              required
            />
            <br></br>
            <label style={{ color: "#111111" }}>What's your Name?</label>
            <br></br>
            <input
              type="text"
              id="Fname"
              name="Fname"
              placeholder="Your First Name"
              value={this.state.fname}
              onChange={(e) => this.setState({ fname: e.target.value })}
              style={{
                width: 560,
                height: 60,
                fontSize: 20,
                backgroundColor: "#DDDDDD",
              }}
              required
            />
            <br></br>

            <input
              type="text"
              id="Lname"
              name="Lname"
              placeholder="Your Last Name"
              value={this.state.lname}
              onChange={(e) => this.setState({ lname: e.target.value })}
              style={{
                width: 560,
                height: 60,
                fontSize: 20,
                backgroundColor: "#DDDDDD",
              }}
              required
            />
            <br></br>

            <label style={{ color: "#111111" }}>
              Register a <Link to="/BusinessLogin">Business</Link>
            </label>
            <br></br>
            <br></br>

            <input
              type="submit"
              value="Register"
              onClick={this.onSubmitEventHandler}
            />
          </form>
        </header>
      </div>
    );
  }
}

export default CustomerLogin;
