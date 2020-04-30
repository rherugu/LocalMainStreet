import React from "react";
import logo from "./logo.svg";
import "./About.css";
import $ from "jquery";

import Component from "@reactions/component";

class About extends Component {
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
      <div className="About">
        <header className="Home-Header">
          <div className="HH">
            <div className="logoimg" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo.png")}
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
            <h3 className="Hheading2" onClick={this.onClickLogin}>
              <span>Login</span>
            </h3>
          </div>
        </header>
        <main className="mainA">
          {/* prettier-ignore */}
          <div className="titleandtext">
            <h1 className="titleA">About</h1>
            {/* prettier-ignore */}
            <h3 className="abouttxt">
              We are in the middle of a crisis. Covid 19 has harmed many, but the
              financial aspect is just as bad. People are losing businesses, jobs,
              and money at an fast rate. The situation has begun to surpass that
              of the 2008 recession. Small business owners, the pizza resteraunt
              around the block, the barber shop nearby, etc. These people have
              lost their businesses. And thats where we come in.
              <br></br><br></br> 
              LocalMainStreet allows you as a customer to buy gift cards from these small
              businesses. If you own a business, then registering is easy. You can
              share and buy gift cards and vouchers. Let's take a step forward,
              together!
            </h3>
          </div>
        </main>
      </div>
    );
  }
}

export default About;
