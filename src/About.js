import React from "react";
import "./About.css";
import $ from "jquery";

import Component from "@reactions/component";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      dashboardoftheB: "none",
    };
  }

  componentDidMount() {
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
    if (localStorage.getItem("type") === "business") {
      this.setState({ dashboardoftheB: "flex" });
    } else {
      this.setState({ dashboardoftheB: "none" });
    }
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
  render() {
    return (
      <div className="About">
        <div
          className="burger1"
          style={{
            height: "100%",
            opacity: this.state.burger,
            pointerEvents: this.state.pointerEvents,
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
          {/* <a href="/BDashboard">
            <span
              className="Hheading1b"
              style={{ display: this.state.dashboardoftheB }}
            >
              <span>Dashboard</span>
            </span>
          </a> */}
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
            <h3 className="Hheading2" style={{ display: this.state.logout }}>
              <a href="/BDashboard">
                <span
                  className="Hheading1"
                  style={{ display: this.state.dashboardoftheB }}
                >
                  <span>Dashboard</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </a>
              <span onClick={this.onClickLogout}>Logout</span>
            </h3>
          </div>
        </header>
        <div className="st"></div>
        <div className="Awrapp">
          <br></br>
          <br></br>
          <br></br>
          <br></br> <br></br>
          <br></br>
          <br></br>
          <br></br> <br></br>
          <br></br>
          <br></br>
          <div
            style={{
              width: "100%",
            }}
          >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h3
              className="abouttxt"
              style={{
                flexDirection: "column",
              }}
            >
              <big>
                <h1 className="titleA">About</h1>
              </big>
              Back in late March, we were hit with a global pandemic caused due
              to the Coronavirus. As the crisis started to unfold, we saw our
              schools and local businesses being shut down. Besides the serious
              danger to public health, the economy also came to a standstill. We
              saw small businesses, the backbone of America, feel the impact.
              Our favorite local resteraunts, salons, and other small businesses
              were struggling to survive. We decided to to something about it.
              <br></br>
              <br></br>
              Here, at LocalMainStreet.com we allow customers to buy/share gift
              cards and vouchers from your favorite local businesses. This will
              help businesses survive these tough times. Registration is free
              and only takes a few clicks. This is our way of contributing to
              the community and the businesses that have served us for a long
              time. <br></br> <br></br>
              In the future, these local businesses can offer their own gift
              cards just like Visa or Amazon would do. United we stand, together
              we win!
              <br></br>
              <br></br>- Raghav and Vaibhav Herugu
              <br></br>
              Marlboro Township School District
            </h3>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div id="fit">
            <big>
              <h1 className="titleA">Team</h1>

              <br></br>
            </big>
            <div
              style={{
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
              className="divflex"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "15px",
                    margin: "auto",
                    alignSelf: "center",
                  }}
                  className="RaghavVaibhavHerugu"
                  src={require("./Assets/Raghav.png")}
                  alt="raghav and vaibhav herugu"
                ></img>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  <strong>
                    <a
                      href="https://github.com/rherugu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Raghav Herugu
                    </a>
                  </strong>
                  <br></br> Incoming 8th Grader
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "15px",
                    margin: "auto",
                    alignSelf: "center",
                  }}
                  className="RaghavVaibhavHerugu"
                  src={require("./Assets/Vaibhav.png")}
                  alt="raghav and vaibhav herugu"
                ></img>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  <strong>
                    <a
                      href="https://github.com/vaibhavherugu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Vaibhav Herugu
                    </a>
                  </strong>
                  <br></br> Incoming 6th Grader
                </p>
              </div>
            </div>

            <big>
              <h1 className="titleA">Advisors</h1>
              <br></br>
            </big>
            <div
              style={{
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
              className="divflex"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "15px",
                    margin: "auto",
                    alignSelf: "center",
                  }}
                  className="RaghavVaibhavHerugu"
                  src={require("./Assets/Veeru.png")}
                  alt="raghav and vaibhav herugu"
                ></img>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  <strong>
                    <a
                      href="https://www.linkedin.com/in/veeranjaneya-murthy-a11b1012a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Veeranjaneya Murthy Pilladi
                    </a>
                  </strong>
                  <br></br>Software Developer
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "15px",
                    margin: "auto",
                    alignSelf: "center",
                  }}
                  className="RaghavVaibhavHerugu"
                  src={require("./Assets/ProfilePic.png")}
                  alt="raghav and vaibhav herugu"
                ></img>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  <strong>
                    <a
                      href="https://www.linkedin.com/in/sreeni-herugu-8694aa1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Sreenivas Herugu
                    </a>
                  </strong>
                  <br></br>Entrepreneur & Tech Consultant
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "15px",
                    margin: "auto",
                    alignSelf: "center",
                  }}
                  className="RaghavVaibhavHerugu"
                  src={require("./Assets/Kavitha.png")}
                  alt="raghav and vaibhav herugu"
                ></img>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <strong>
                    <a
                      href="https://www.linkedin.com/in/kavitha-h-b56620b2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Kavitha Herugu
                    </a>
                  </strong>
                  <br></br>Project Manager
                </p>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
        {/* <h1 className="titleA">Team</h1> */}
      </div>
    );
  }
}

export default About;
