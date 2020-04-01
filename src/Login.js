import React from "react";
import Component from "@reactions/component";
import "./Login.css";
import "react-tabs/style/react-tabs.css";
import "react-awesome-button/dist/styles.css";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Login extends Component {
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
      Password: ""
    };
  }
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

  onSubmitHandler = e => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.Password
    };

    axios
      .post("http://localhost:3000/login/", payload)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data);
        }
        const tokenval = localStorage.getItem("token");
        console.log(tokenval);

        if (!tokenval) {
          alert("Incorrect email or password.");
        }
        this.props.history.push("/Shop");
      })
      .catch(function(err) {
        alert(err);
      });
  };

  render() {
    return (
      <div className="login">
        <header className="Login-header">
          <div className="logoimgL">
            <img src={require("./Assets/LOGObg.png")}></img>
          </div>
          <div className="tabsL">
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
        <div className="form">
          {/* {this.errorMessage ? <h2>{this.errorMessage}</h2> : null} */}

          <big>
            <big>
              <big>
                <h1 style={{ color: "#111111" }}>Login</h1>
              </big>
            </big>
          </big>
          <form>
            <big>
              <big>
                <big>
                  <label style={{ color: "#111111" }}>Email</label>
                </big>
              </big>
            </big>
            <br></br>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              style={{
                width: 560,
                height: 60,
                fontSize: 20,
                backgroundColor: "#DDDDDD"
              }}
              required
            />
            <br></br>

            <big>
              <big>
                <big>
                  <label style={{ color: "#111111" }}>Password</label>
                </big>
              </big>
            </big>
            <br></br>
            <input
              type="text"
              id="Pass"
              name="Password"
              placeholder="Your Password"
              value={this.state.Password}
              onChange={e => this.setState({ Password: e.target.value })}
              style={{
                width: 560,
                height: 60,
                fontSize: 20,
                backgroundColor: "#DDDDDD"
              }}
              required
            />

            <br></br>
            <big>
              <big>
                <big>
                  <label style={{ color: "#111111" }}>
                    Not a member yet? Register{" "}
                    <Link to="/CustomerLogin">here</Link>
                  </label>
                </big>
              </big>
            </big>
            <br></br>
            <br></br>
            <big>
              <big>
                <big>
                  <label style={{ color: "#111111" }}>
                    Register a <Link to="/BusinessLogin">Business</Link>
                  </label>
                </big>
              </big>
            </big>
            <br></br>
            <br></br>
            <input
              type="submit"
              value="Submit"
              onClick={this.onSubmitHandler}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
