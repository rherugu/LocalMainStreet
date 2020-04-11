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
              <div className="socialmedia">
                <div className="facebook">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEnklEQVRoge2YXWhcRRTH/2fubjcJScz2Q5v9KBQxKqKirQ+lBCUFUYixIhilWGm6m7cWKVWfKjE+ihUqPpgEpYJGm1CxJfrkRyMm0hR8KdpIqpBks1pLbbZbN8nuzPEhRWru3Ltz793FB/f3OHPOmfPP3jNzcoAaNWr8L6CKRjs6Vx9qFDsV0XYCtwFIAGi4sfsXgHlmTAvB50o5nsChZKFSRwcX0sfCSmS7oPgFEB4HEDH0XAbwOYDjMhM7jT5SQdLwL4SZrKHsHgIfYaAtYBLTTNQv97cOg4h9xvDBwHybRTQEoN2XvyN8RhKnkErOePX0LMQazHQDGATQ5NXXCEYOglMylRjx4iY8GQ8uHATwEaolAgAIzWD6RAxmXvLmZogYyBwgwjHvmfmHwYdVOvGmia2RkBuf07CpfQVhgJ+R6cRoOcPyia0W9jkE/Jzu3xBGRyyC25stRNcJFBkolBjXigpnsisYm13SOzJyUqht5S6AkOvpq1fsuwD7FnHHLSEMtLegffM6R5t4Q8FZCKHZYvGeZH7Y7Wp2LXZrKLsH4EfMUrZzd0sIE10bXUUY0m4NLTzrZuAs5ARbBD7i92QC8GFHFNGIp4vRLd6r6GPHYI4bVi77RJAX+7FkHe5bH/brboOBu6zYQqfTvnONrPZOvuncom+5ZvMSL04u4vyV4j9r+ZJhVyJ4L4BTui19qkfn6q0m8SfMG0AbU7s34YGN9l+kY+wyxrMrfsMuydBKFPu22m4G7acVahQ7EUAEANxabw89m5f41r8IAKgLqfAO3YZWiCLaHuQ0AGheZw99MVeCr9b2JpTS56YVQsR3BjwPluajXVwJKgMgQJub/tZitAY+URu2AhDHdMtO129jJc6sDqTtMtxbFEPO7t6ErU3Wv9bqQ/Zvq3NLBH88v9m2fuz8dbz+w7VAOTgJyXsJ0hQmoxc8LAjRiF3g3HXp4TTWKtafTsh6iByYC1dL5sZMC7plrRBmmvaXkj9+XjQXwoA2N60QQWrKZ06euVRQuLJsPgkS0OemrZFSjiesJloCUGcSvGf8KhrWFPepR9cjsuYx+e63FfSvKep80dOlXCiFSt/rNvTFfihZwGDmCwBPmUSf/N3edkhNfpeWFL7MLJuEdIDGdH0W4P6P1fEAJ1YH4g+cthyFyEzsNDkU1n8BAT/J+diY077zL9JHion6q5KVDxh4zW0+7PqKyf2tw2D6uvJpeWZcpmIn3Azcn2MilkL2gpGraFqeoEVphfaVG26X7ytSyRkITqFCzatHFIAe9Nz2SzlDoxGHTCVGGDgQOC2PMPFhmY6dNLE1ntWodPwdZhzE6l+p2jADL6tU4i1TB09DJ9Ubfxvg7urWDC2C6WmVjr/hxcvz9EymE6NSqG0AfePV14CvpGU9KHtjn3p19DcGTCVnZKq1A4znCLjgK8ZNEONHMHfLdHyXSWHr8D/PJGLZG/+4lIndA8aTAJ8E4DCJ1lIAaBSErtJC7F7Zm3B9J8qmE8TZxvu/1oVUeIdiemhkV8veaMTa0BwW9QAoX1SFqcvFi6+czX0miKdKojjp1ADWqFGjhiN/A/mbfr9qzWaFAAAAAElFTkSuQmCC" />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="instagram">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="data:image/png;base64,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" />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="linkedin">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACjklEQVRoge2ZT2gTQRTGv9m0pu0mEAu2ikuJDQqCNNbWniJ6qViwFg+i0osXvTeCDfSmElIPAQ8eRK8FsQiilXqzgvWgLbbpQRFUrD0YW0ItCSbY3edFlCQ7SSd1divM7/bmvZ39vn37Z3YXUCgUCjdh1Qo8idQAiIaIoRuA7oAmAMgR2GsNlDRj4ceVCisa0EbnEiA2/G+1CRO3YuERXpJrwJNIDRDooRxNYjCN+s0rByfschp3K6IhaYoEsSwW5eW4BoihS44ccRjQzcvxOwD4JGipFT8vUcmALfuavZgaDGEtegDPB0PYu927OWmbRNjAnT4DRwwder2GiKHjdp8hQ9eGETbQ2dpYFHeVxE4jbOBN+kdRPFsSO42wgYuTS3ixlEPup4WpxSwuTX6RoWvD1Ilu8D5TwNGxDzK01IRwB7Yawh0whzvKxjyjqar53f56XO7Zgd6gD+0BLwqmhYXlPO6/XcXd+QwKJolKAVCDgVoItzTg6dl2tDT93V1DnQcRQ0fE0HGhoxn945/wNbcuPLcjp9D46WCR+FIOtTZi7FRb9bW9DY4YCAW2Va051ubDiRB3xcDFEQMWATdnVtB77yPOP1rEs89Z27pz+wPCcztyDVydTuPadPpP/ODdd0ycCeL4nuIj3rOrSXhuRzpwa3alKDaJEH/5raxupy5+PKUbIACZvFk2vrCcLxvzez3C80s3wLuzrBbKTW3Zu5BMlAG3UQbcRhlwm//eAPfZoSXma3vDkIQVC9tqrdQB+yWjK7A1Xob/bRRsRo4YcQjE1cI1oIGScuSIo8HiauEa+P1nJC5FkRB03Yx1PuFlq/9iujF30rJYlAGH4dwX6ywBrzRYyUriFQqFwn1+AXvFo7bcPPZdAAAAAElFTkSuQmCC" />
                </div>
              </div>
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
