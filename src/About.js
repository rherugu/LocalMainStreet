import React from "react";
import logo from "./logo.svg";
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
            <h3
              className="Hheading2"
              style={{ display: this.state.logout }}
              onClick={this.onClickLogout}
            >
              <span>Logout</span>
            </h3>
          </div>
        </header>
        <div className="st"></div>
        <div className="Awrapp">
          {" "}
          {/* <main className="mainA">

            <div className="titleandtext">
            <h1 className="titleA">About</h1>
    
            
            
          </div>
          </main> */}
          <div
            style={{
              width: "100%",
            }}
          >
            <h1 className="titleA">About</h1>
            <h3 className="abouttxt">
              Back in late March, we were hit with global pandemic caused due to
              the Coronavirus. As the crisis started unfold, we saw our schools
              and local businesses being shut down. Besides the serious danger
              to public health, the economy also came to a standstill. We saw
              small businesses, the backbone of America, feel the impact. Our
              favorite local resteraunts, salons, and other small businesses
              were struggling to survive. We decided to to something about it.
              <br></br>
              <br></br>
              Here, at LocalMainStreet.com we allow customers to buy and share
              gift cards and vouchers from your favorite local businesses.
              Registration is free and only takes a few clicks. This is our way
              of contributing to the community and the businesses that have
              served us for a long time. United we stand, together we win!
            </h3>
          </div>
          <div id="fit">
            <img
              style={{
                borderRadius: "15px",
                margin: "auto",
                alignSelf: "center",
              }}
              className="RaghavVaibhavHerugu"
              src={require("./Assets/AboutUsPic.png")}
              alt="raghav and vaibhav herugu"
            ></img>
            <p
              style={{
                textAlign: "center",
                margin: "auto",
              }}
              className="cofounder"
            >
              The Co-Founders, Raghav and Vaibhav Herugu, Both Middle Schoolers
              from New Jersey
            </p>
          </div>
        </div>
        {/* <h1 className="titleA">Team</h1> */}
      </div>
    );
  }
}

export default About;
