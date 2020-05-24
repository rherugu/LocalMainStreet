import React from "react";
import "./Home.css";
import Component from "@reactions/component";
import TextLoop from "react-text-loop";
import axios from "axios";
import { toast } from "react-toastify";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
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
      name: "",
      emailc: "",
      message: "",
      anchorEl: "",
      hoverColor: "white",
      hoverColor2: "white",
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
    };
    this.cursor = React.createRef();
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

  onClickLogout = () => {
    localStorage.setItem("token", undefined);
    localStorage.setItem("Btoken", undefined);
    this.props.history.push("/login");
  };

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

  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  resetForm = () => {
    this.setState({ name: "", emailc: "", message: "" });
  };

  notify = () => toast("Wow so easy !", { type: "success" });

  handleSubmit = (e) => {
    e.preventDefault();

    toast.configure();

    if (
      this.state.name === "" ||
      this.state.emailc === "" ||
      this.state.message === ""
    ) {
      toast("Not all fields are filled in. Make sure to fill in every field.", {
        type: "error",
      });
      return;
    } else {
      const payload = {
        name: this.state.name,
        emailc: this.state.emailc,
        message: this.state.message,
      };

      axios
        .post("http://localhost:3003/app/contact/send", payload)
        .then((response) => {
          if (response.data.status === "success") {
            toast("Thank you very much for your feedback.", {
              type: "success",
            });
            this.resetForm();
          } else if (response.data.status === "fail") {
            toast(
              "Hmmmm, Something went wrong. Dont worry, its not you, its us. Please try again.",
              { type: "error" }
            );
          } else if (
            // prettier-ignore
            response.data === '"emailc" must be a valid email'
          ) {
          toast("Your email must be a valid email.", { type: "error" });
        }
          // prettier-ignore
          else if (
            // prettier-ignore
            response.data === '"message" length must be at least 6 characters long'
          ) {
            toast(
              "Your message is too short. It needs to be at least 6 characters.",
              { type: "error" }
            );
          }
        });
    }
  };

  render() {
    // let mouseCursor = document.querySelector(".cursor");
    // // let navLinks = document.querySelectorAll(".navlinks")

    // function cursor1(e) {
    //   this.cursor.current.style.top = e.pageY + "px";
    //   this.cursor.current.style.left = e.pageX + "px";
    // }

    // window.addEventListener("mousemove", cursor1);

    return (
      <div className="slideshowbg">
        {/* <meta name="viewport" content="initial-scale=1.0"></meta> */}
        <div
          className="burger"
          style={{
            opacity: this.state.burger,
            pointerEvents: this.state.pointerEvents,
          }}
        >
          <h3 className="Hheading1b" onClick={this.onClickHome}>
            <span>Home</span>
          </h3>
          <h3 className="Hheading1b" onClick={this.onClickShop}>
            <span>Shop</span>
          </h3>
          <h3 className="Hheading1b" onClick={this.onClickAbout}>
            <span>About</span>
          </h3>
          <h3 className="Hheading1b" onClick={this.onClickContact}>
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
        <div className="cursor" ref="cursor"></div>
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
        <div className="sectionf">
          <div className="Home">
            <title>LocalMainStreet</title>

            <h1 className="textloop">
              We Bring&nbsp;
              <TextLoop
                interval={2000}
                springConfig={{ stiffness: 180, damping: 8 }}
              >
                <span className="ICG">&nbsp;People&nbsp;</span>
                <span className="ICG">&nbsp;Businesses&nbsp;</span>
                <span className="ICG">&nbsp;Communities&nbsp;</span>
              </TextLoop>{" "}
              Together.
            </h1>
            <h2 className="textloop2">Together, we win!</h2>

            {/* <button style={{ visibility: "hidden" }}>
              <div
                onClick={this.onClickCustomerLogin}
                className="butn btn-four"
                style={{ visibility: "visible" }}
              >
                <span className="span" style={{ fontSize: 32 }}>
                  Get Started
                </span>
              </div>
            </button> */}

            <div className="mainbutton">
              <a
                onClick={this.onClickCustomerLogin}
                className="fancy-button pop-onhover bg-gradient1"
              >
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="bgcover">
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

            <div className="parentvid1">
              <big>
                <h2 className="textvid" style={{ textAlign: "center" }}>
                  During the Covid 19 outbreak, we connect local businesses to
                  your community. In these uncertain times, we need to stand
                  together. You can help by buying gift cards and vouchers from
                  your local businesses to be redeemed later when the crisis is
                  over.{" "}
                </h2>
              </big>
            </div>

            <div className="parentvid">
              <div className="videop">
                <div
                  className="video1"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <video
                    className="video"
                    controls
                    src={require("./Assets/introVid.mp4")}
                  ></video>
                </div>
              </div>
            </div>

            <div className="AvailableP">
              <big>
                <big>
                  <big>
                    <h1 className="Available">Available For Download</h1>
                  </big>
                </big>
              </big>
            </div>
            <img
              className="phoneimg"
              src={require("./Assets/phone.png")}
              draggable="false"
            ></img>
          </div>
        </div>
        <div className="home-footer">
          <div className="logoandterms">
            <div className="logoimg3" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo.png")}
                className="logoimage2"
                style={{ width: "250px" }}
              ></img>
            </div>

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

            <a
              className="terms link"
              style={{
                zIndex: "999909090",
                width: "max-content",
                color: this.state.hoverColor,
              }}
              onMouseEnter={() => {
                this.setState({
                  hoverColor: "black",
                });
              }}
              onMouseLeave={() => {
                this.setState({
                  hoverColor: "white",
                });
              }}
              onClick={() => {
                this.props.history.push("/TermsOfUse");
              }}
            >
              Terms and Conditions
            </a>
            <a
              className="terms link"
              style={{
                zIndex: "999909090",
                width: "max-content",
                color: this.state.hoverColor2,
              }}
              onMouseEnter={() => {
                this.setState({
                  hoverColor2: "black",
                });
              }}
              onMouseLeave={() => {
                this.setState({
                  hoverColor2: "white",
                });
              }}
              onClick={() => {
                this.props.history.push("/PrivacyPolicy");
              }}
            >
              Privacy Policy
            </a>
          </div>

          <form className="contactus">
            <input
              className="app-form-control"
              placeholder="NAME"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
            <input
              className="app-form-control"
              placeholder="EMAIL"
              value={this.state.emailc}
              onChange={(e) => this.setState({ emailc: e.target.value })}
            ></input>
            <textarea
              className="app-form-control"
              placeholder="MESSAGE"
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
            ></textarea>

            <div className="app-form-group buttons">
              <button
                className="app-form-button"
                type="reset"
                onClick={() => {
                  this.setState({
                    name: "",
                    emailc: "",
                    message: "",
                  });
                }}
              >
                CANCEL
              </button>
              <button
                className="app-form-button"
                onClick={this.handleSubmit}
                type="submit"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
