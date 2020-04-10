import React, { useState } from "react";
import "./Home.css";
import "./Home.scss";
import Component from "@reactions/component";
import TextLoop from "react-text-loop";
import BackgroundSlideshow from "react-background-slideshow";
import "./fonts.css";
import ReactPlayer from "react-player";
import $ from "jquery";

class Home extends Component {
  componentDidMount() {
    this.title();
  }
  title = () => {
    document.title = "LocalMainStreet";
  };

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

  onClickCustomerLogin = () => {
    this.props.history.push("/CustomerLogin");
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
    // $(window).scroll(function() {
    //   if (
    //     $(window).scrollTop() + $(window).height() >
    //     $(document).height() - 100
    //   ) {
    //     this.document.getElementById("wrapper").style.width = "80%";
    //     this.document.getElementById("wrapper").style.margin = "auto";
    //     this.document.getElementById("header").style.width = "80%";
    //   } else {
    //     this.document.getElementById("wrapper").style.width = "100%";
    //     this.document.getElementById("wrapper").style.height = "100%";
    //   }
    // });

    return (
      <div className="slideshowbg">
        <div className="Home">
          <title>LocalMainStreet</title>

          <div
            className="Home-headerP"
            id="header"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="Home-header">
              <div className="logoimg" onClick={this.onClickHome}>
                <img
                  src={require("./Assets/golo.png")}
                  className="logoimage"
                ></img>
              </div>

              <div className="tabs">
                <div className="navtabs" onClick={this.onClickHome}>
                  <span id="btnspan">Home</span>
                </div>
                <br></br>
                <div className="navtabs" onClick={this.onClickShop}>
                  <span id="btnspan">Shop</span>
                </div>
                <br></br>
                <div className="navtabs" onClick={this.onClickAbout}>
                  <span id="btnspan">About</span>
                </div>
                <br></br>
                <div className="navtabs" onClick={this.onClickContact}>
                  <span id="btnspan">Contact</span>
                </div>
                <br></br>
                <div className="divider"></div>

                <div
                  className="navtabsL"
                  id=".dropbtn"
                  onClick={this.onClickLogin}
                >
                  <span id="btnspan">Login</span>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="main">
            <big>
              <big>
                <big>
                  <big>
                    <big>
                      <big>
                        <big>
                          <big>
                            <h1 className="textloop">
                              <TextLoop
                                interval={1500}
                                springConfig={{ stiffness: 180, damping: 8 }}
                              >
                                <span className="ICG">Inspire.</span>
                                <span className="ICG">Create.</span>
                                <span className="ICG">
                                  &nbsp;&nbsp;Grow.&nbsp;&nbsp;
                                </span>
                              </TextLoop>{" "}
                            </h1>
                          </big>
                        </big>
                      </big>
                    </big>
                  </big>
                </big>
              </big>
            </big>
            <button style={{ visibility: "hidden" }}>
              <div
                onClick={this.onClickCustomerLogin}
                className="butn btn-four"
                style={{ visibility: "visible" }}
              >
                <span className="span" style={{ fontSize: 32 }}>
                  Get Started
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="bgcover">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <big style={{ textAlign: "center" }}>
            <big>
              <big>
                <big>
                  <big>
                    <h1 className="WWA">What We Do</h1>
                  </big>
                </big>
              </big>
            </big>
          </big>
          <br></br>

          <div className="parentvid">
            <div className="videop">
              <div
                className="video"
                style={{
                  textAlign: "center",
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/h3dKMLCbOhk"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  className="video"
                ></iframe>
              </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <big>
              <h2 className="textvid">
                During the Covid 19 outbreak, we connect local businesses to
                you. Since they are making no money, you can help by buying gift
                cards and redeeming them later.{" "}
              </h2>
            </big>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <big>
            <big>
              <big>
                <h1 className="Available">Available For Download</h1>
              </big>
            </big>
          </big>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <img className="phoneimg" src={require("./Assets/phone.png")}></img>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="home-footer">
            <div className="logoandterms">
              <div className="logoimg" onClick={this.onClickHome}>
                <img
                  src={require("./Assets/golo.png")}
                  className="logoimage"
                  style={{ width: "450px" }}
                ></img>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <a className="terms">Terms and Conditions</a>
              <a className="terms1"> | </a>
              <a className="terms">Privacy Policy</a>
            </div>

            <div className="screen">
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close"></div>
                  <div className="screen-header-button maximize"></div>
                  <div className="screen-header-button minimize"></div>
                </div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis"></div>
                  <div class="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>CONTACT</span>
                    <span>US</span>
                  </div>
                  <div className="app-contact">
                    CONTACT INFO : +1 732 803 8584
                  </div>
                </div>
                <div className="screen-body-item">
                  <div className="app-form">
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="NAME"
                      ></input>
                    </div>
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="EMAIL"
                      ></input>
                    </div>
                    <div className="app-form-group message">
                      <textarea
                        className="app-form-control"
                        placeholder="MESSAGE"
                        rows="6"
                        columns="10"
                      ></textarea>
                    </div>
                    <div className="app-form-group buttons">
                      <button className="app-form-button" type="reset">
                        CANCEL
                      </button>
                      <button className="app-form-button">SEND</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
