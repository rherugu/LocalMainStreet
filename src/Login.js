import React from "react";
import Component from "@reactions/component";
import "./Login.css";
import "react-tabs/style/react-tabs.css";
import "react-awesome-button/dist/styles.css";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Loader from "./Loader";

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.REACT_APP_KEY);
const bcrypt = require("bcryptjs");

var keyCode;

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
      Password: "",
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      forgotPass: "none",
      emailp: "",
      keyCode: "none",
      keyCodeVal: "",
      newP: "none",
      newPVal: "",
      id: "",
      succfcusbusfp: "Click Enter to submit",
      succfcusbusfp2: "Click Enter to submit",
      succfcusbusfp3: "Click Enter to submit",
      succfcusbusfp4: "Click Enter to submit",
      caps: "hidden",
      getstarted: "flex",
      incorrect: "none",
      getstartedisplay: "none",
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
  onClickLogout = () => {
    localStorage.setItem("token", undefined);
    localStorage.setItem("Btoken", undefined);
    this.props.history.push("/login");
  };
  componentDidMount() {
    try {
      var e = this.props.location.state.error;
      e: if (e === "yes") {
        window.onload = function () {
          //considering there aren't any hashes in the urls already
          if (!window.location.hash) {
            //setting window location
            window.location = window.location + "#loaded";
            //using reload() method to reload web page
            window.location.reload();
            // window.location.reload();
          }
        };
      }
    } catch (error) {}
    try {
      var getstarted = this.props.location.state.getsStarted;
      if (getstarted === "yes") {
        this.setState({
          getstarted: "none",
          getstartedisplay: "flex",
        });
      }
    } catch (err) {}

    const tokenval = localStorage.getItem("token");
    const tokenvalB = localStorage.getItem("Btoken");

    var tokenC = `${tokenval}`;
    var tokenB = `${tokenvalB}`;

    if (tokenB && tokenC === "undefined") {
      if (this.state.login === "none") {
        this.setState({
          login: "flex",
          logout: "none",
        });
      }
    } else if (tokenB || tokenC !== "undefined") {
      if (this.state.login === "flex") {
        this.setState({
          login: "none",
          logout: "flex",
        });
      }
    }
  }
  onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.Password,
    };
    trackPromise(
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/LoginAPI/login",
          payload
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("emailb", response.data.emailb);
            localStorage.setItem("fname", response.data.fname);
            localStorage.setItem("lname", response.data.lname);
          }
          const tokenval = localStorage.getItem("token");
          console.log(tokenval);
          console.log(response.data.stripeId);

          if (!tokenval) {
            this.setState({
              incorrect: "block",
            });
          }
          try {
            if (this.props.location.state.SuccessJs === "yes") {
              this.props.history.push("/Success");
            }
          } catch (error) {}

          try {
            if (this.props.location.state.qrcode === "yes") {
              this.props.history.push("/QRcode");
              alert("fg");
            }
          } catch (error) {}

          if (response.data.url === "/Shop") {
            this.props.history.push("/Shop");
          } else if (
            response.data.url === "/Dashboard" &&
            response.data.stripeId
          ) {
            this.props.history.push({
              pathname: "/BDashboard",
              state: {
                // tour: "no",
                stripeAccountId: response.data.stripeId,
              },
            });
          } else {
            alert(
              "Whoops! Something wrong happened. Possible causes are that this account has not registered properly."
            );
          }
        })
        .catch((err) => {
          this.setState({
            incorrect: "flex",
          });
          console.log(err);
        })
    );
  };

  onkeydownLogin = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const payload = {
        email: this.state.email,
        password: this.state.Password,
      };
      trackPromise(
        axios
          .post(
            "https://localmainstreetbackend.herokuapp.com/app/LoginAPI/login",
            payload
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("email", response.data.email);
              localStorage.setItem("emailb", response.data.emailb);
              localStorage.setItem("fname", response.data.fname);
              localStorage.setItem("lname", response.data.lname);
            }
            const tokenval = localStorage.getItem("token");
            console.log(tokenval);
            console.log(response.data.stripeId);

            if (!tokenval) {
              this.setState({
                incorrect: "block",
              });
            }
            try {
              if (this.props.location.state.SuccessJs === "yes") {
                this.props.history.push("/Success");
              }
            } catch (error) {}

            try {
              if (this.props.location.state.qrcode === "yes") {
                window.location.assign("/QRcode");
              }
            } catch (error) {}

            if (response.data.url === "/Shop") {
              this.props.history.push("/Shop");
            } else if (
              response.data.url === "/Dashboard" &&
              response.data.stripeId
            ) {
              this.props.history.push({
                pathname: "/BDashboard",
                state: {
                  // tour: "no",
                  stripeAccountId: response.data.stripeId,
                },
              });
            } else {
              alert(
                "Whoops! Something wrong happened. Possible causes are that this account has not registered properly."
              );
            }
          })
          .catch((err) => {
            this.setState({
              incorrect: "flex",
            });
            console.log(err);
          })
      );
    } else {
      return 0;
    }
  };

  forgotPass = () => {
    if (this.state.forgotPass === "none") {
      this.setState({
        forgotPass: "flex",
      });
    }
    if (this.state.forgotPass === "flex") {
      this.setState({
        forgotPass: "none",
      });
    }
  };

  passwordSend = async (e) => {
    if (e.keyCode === 13) {
      this.setState({
        succfcusbusfp2: "Loading...",
      });
      await axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/contact/resetPass",
          {
            emailp: this.state.emailp,
          }
        )
        .then((res) => {
          console.info(res);
          keyCode = cryptr.decrypt(res.data.encKey);
          this.setState({
            keyCode: "flex",
          });
        })
        .catch((err) => {
          console.error("err", err);
        });

      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/LoginAPI/posts/getId",
          {
            emailf: this.state.emailp,
          }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            id: res.data.emailp._id,
          });
          this.setState({
            succfcusbusfp2: "Success!",
          });
          console.log(this.state.id);
        })
        .catch((e) => {
          this.setState({
            succfcusbusfp2: "This email is not in our database.",
          });
          this.setState({
            keyCode: "none",
          });
        });
    } else {
      return 0;
    }
  };

  keyCodeValCheck = async (e) => {
    if (e.keyCode === 13) {
      this.setState({
        succfcusbusfp3: "Loading...",
      });
      if (this.state.keyCodeVal === keyCode) {
        this.setState({
          newP: "flex",
        });
      } else {
        alert("Invalid Code");
      }
      this.setState({
        succfcusbusfp3: "Success!",
      });
    } else {
      return 0;
    }
  };

  updatePass = async (e) => {
    if (e.keyCode === 13) {
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(this.state.newPVal, salt);
      console.info(hashedPassword);
      await axios
        .patch(
          "https://localmainstreetbackend.herokuapp.com/app/LoginAPI/posts/" +
            this.state.id,
          {
            passwordf: hashedPassword,
          }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            succfcusbusfp4: "Success! You may login now.",
          });
          window.location.reload();
        })
        .catch((err) => {
          console.error("ERROR!!!", err);
        });
    } else {
      return 0;
    }
  };

  render() {
    var input = document.getElementById("Pass");
    var text = document.getElementById("CapsLock");
    if (input && text) {
      input.addEventListener("keyup", function (event) {
        if (event.getModifierState("CapsLock")) {
          text.style.display = "block";
          text.style.visibility = "visible";
        } else {
          text.style.display = "none";
          text.style.visibility = "hidden";
        }
      });
    }

    return (
      <div className="login">
        <div
          className="burger1"
          style={{
            height: "100%",
            opacity: this.state.burger,
            pointerEvents: this.state.pointerEvents,
            position: "fixed",
          }}
        >
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickHome}
          >
            <span>Home</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickShop}
          >
            <span>Shop</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickAbout}
          >
            <span>About</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickContact}
          >
            <span>Contact</span>
          </h3>
          <h3
            className="Hheading2b"
            style={{ fontSize: "20px", display: this.state.login }}
            onClick={this.onClickLogin}
          >
            <span>Login</span>
          </h3>
          <h3
            className="Hheading2b"
            style={{ fontSize: "20px", display: this.state.logout }}
            onClick={this.onClickLogout}
          >
            <span>Logout</span>
          </h3>
        </div>
        <Loader />
        <header className="Home-Header">
          <div className="HH">
            <div className="logoimg" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo2.png")}
                className="logoimage"
                alt="localmainstreet"
              ></img>
            </div>
            <div className="logoimg2" onClick={this.onClickHome}>
              <img
                src={require("./Assets/logor.png")}
                className="logoimage2"
                alt="localmainstreet"
              ></img>
            </div>

            <div
              className="burgermenu"
              style={{
                zIndex: "493324",
              }}
              onClick={() => {
                this.setState({
                  burger: "1",
                  width: "30px",
                  pointerEvents: "all",
                });
                if (this.state.burger === "1") {
                  this.setState({
                    burger: "0",
                  });
                }
                if (this.state.pointerEvents === "all") {
                  this.setState({
                    pointerEvents: "none",
                  });
                }
              }}
            >
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
            </div>

            <h3 className="Hheading1" onClick={this.onClickHome}>
              <span>Home</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickShop}>
              <span>Shop</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickAbout}>
              <span>About</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickContact}>
              <span>Contact</span>
            </h3>
            <h3
              className="Hheading2"
              style={{ display: this.state.login }}
              onClick={this.onClickLogin}
            >
              <span>Login</span>
            </h3>
            <h3
              className="Hheading2"
              style={{ display: this.state.logout }}
              onClick={this.onClickLogout}
            >
              <span>Logout</span>
            </h3>
          </div>
        </header>
        <main
          className="mainLog"
          style={{
            display: this.state.getstarted,
          }}
        >
          <div className="formL">
            {/* {this.errorMessage ? <h2>{this.errorMessage}</h2> : null} */}

            <form className="formL">
              <big>
                <big>
                  <big>
                    <h1 className="titleLog" style={{ color: "#111111" }}>
                      Login
                    </h1>
                  </big>
                </big>
              </big>
              <big>
                <big>
                  <big>
                    <label style={{ color: "#111111" }}>Email</label>
                  </big>
                </big>
              </big>
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
                onKeyDown={this.onkeydownLogin}
              />
              <big>
                <big>
                  <big>
                    <label style={{ color: "#111111" }}>Password</label>
                  </big>
                </big>
              </big>
              <input
                type="password"
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
                onLoad={() => {
                  this.setState({
                    caps: "hidden",
                  });
                }}
                onKeyDown={this.onkeydownLogin}
              />
              <h5
                id="CapsLock"
                style={{
                  visibility: this.state.caps,
                  color: "red",
                }}
              >
                Warning! You have Caps-Lock on.
              </h5>
              <h5
                style={{
                  color: "red",
                  display: this.state.incorrect,
                }}
              >
                Incorrect email or password.
              </h5>
              <a
                href="#"
                className="fancy-button22121 pop-onhover bg-gradient3 oo"
                onClick={this.onSubmitHandler}
                type="submit"
              >
                <span>
                  Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img
                    className="icons8"
                    src="data:image/png;base64,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"
                  />
                </span>
              </a>
              <br></br>
              <big>
                <big>
                  <big>
                    <label style={{ color: "#111111" }}>
                      Not a member yet?
                    </label>
                  </big>
                </big>
              </big>

              {/* <big>
                <big>
                  <big>
                    <label style={{ color: "#111111" }}>
                      Register a{" "}
                      <Link className="link" to="/BusinessLogin">
                        Business
                      </Link>
                    </label>
                  </big>
                </big>
              </big>
              <br></br>
              <big>
                <big>
                  <big>
                    <label style={{ color: "#111111" }}>
                      Login as a{" "}
                      <Link className="link" to="/BusinessL">
                        Business
                      </Link>
                    </label>
                  </big>
                </big>
              </big> */}

              <div className="loginB">
                <br />
                <div
                  className="buttonb"
                  onClick={() => {
                    this.props.history.push("/BusinessLogin");
                  }}
                >
                  <svg>
                    <polyline
                      className="o1"
                      points="0 0, 150 0, 150 55, 0 55, 0 0"
                    ></polyline>
                    <text
                      x="50%"
                      y="35%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      fill="black"
                    >
                      Register a
                    </text>
                    <text
                      x="50%"
                      y="65%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      fill="black"
                    >
                      Business
                    </text>
                    <polyline
                      className="o2"
                      points="0 0, 150 0, 150 55, 0 55, 0 0"
                    ></polyline>
                  </svg>
                  {/* <span>Register a</span>
                  <span>Business</span> */}
                </div>

                <br />
                <br />
                <br />

                <div
                  className="buttonb"
                  onClick={() => {
                    this.props.history.push("/CustomerLogin");
                  }}
                >
                  <svg>
                    <polyline
                      className="o1"
                      points="0 0, 150 0, 150 55, 0 55, 0 0"
                    ></polyline>
                    <text
                      x="50%"
                      y="35%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      fill="black"
                    >
                      Register as
                    </text>
                    <text
                      x="50%"
                      y="65%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      fill="black"
                    >
                      a Customer
                    </text>
                    <polyline
                      className="o2"
                      points="0 0, 150 0, 150 55, 0 55, 0 0"
                    ></polyline>
                  </svg>
                  {/* <span>Register a</span>
                  <span>Business</span> */}
                </div>
                <br></br>
              </div>
              <a
                href="javascript:void(0)"
                onClick={this.forgotPass}
                className="link"
              >
                Forgot Password?
              </a>
              <br></br>
              <div
                style={{
                  display: this.state.forgotPass,
                  flexDirection: "column",
                }}
              >
                <label>
                  Enter your email so we can send you a confirmation code. This
                  email should be registered with LocalMainStreet.
                </label>
                <input
                  type="email"
                  value={this.state.emailp}
                  onChange={(e) => {
                    this.setState({
                      emailp: e.target.value,
                    });
                  }}
                  placeholder="Email"
                  onKeyDown={this.passwordSend}
                ></input>
                <small>
                  <h4>{this.state.succfcusbusfp2}</h4>
                </small>
              </div>

              <div
                style={{
                  display: this.state.keyCode,
                  flexDirection: "column",
                }}
              >
                <label>
                  Email Sent! Check your email and enter the confirmation key:
                </label>
                <input
                  type="text"
                  value={this.state.keyCodeVal}
                  onChange={(e) => {
                    this.setState({
                      keyCodeVal: e.target.value,
                    });
                  }}
                  placeholder="Key"
                  onKeyDown={this.keyCodeValCheck}
                ></input>
                <small>
                  <h4>{this.state.succfcusbusfp3}</h4>
                </small>
              </div>
              <div
                style={{
                  display: this.state.newP,
                  flexDirection: "column",
                }}
              >
                <label>Enter new password:</label>
                <input
                  type="password"
                  value={this.state.newPVal}
                  onChange={(e) => {
                    this.setState({
                      newPVal: e.target.value,
                    });
                  }}
                  placeholder="New Password"
                  onKeyDown={this.updatePass}
                ></input>
                <small>
                  <h4>{this.state.succfcusbusfp4}</h4>
                </small>
                <br></br>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
