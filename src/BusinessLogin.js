import React from "react";
import axios from "axios";
import Component from "@reactions/component";
import "./BusinessLogin.css";
import "react-tabs/style/react-tabs.css";
import "react-awesome-button/dist/styles.css";
import { trackPromise } from "react-promise-tracker";
import Loader from "./Loader";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { post } from "jquery";

var res = "f";
var stripeAccountId;

class BusinessLogin extends Component {
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
    this.props.history.push("/Login");
  };
  onClickLogout = () => {
    localStorage.setItem("token", undefined);
    localStorage.setItem("Btoken", undefined);
    localStorage.setItem("type", "loggedout");
    this.props.history.push("/login");
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
      website: " ",
      businessCatagory: "",
      displaymessage: "hidden",
      Password: "",
      accountHolderName: "",
      accountHolderType: "",
      routingNumber: "",
      accountNumber: "",
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      help: "none",
      displayError: "none",
      displayErrorText: "",
      displayErrorTextw: "",
      displayErrorw: "none",
      redirecting: "flex",
      dashboardoftheB: "none",
    };
  }
  async componentDidMount() {
    const tokenval = localStorage.getItem("token");
    const tokenvalB = localStorage.getItem("Btoken");

    var tokenC = `${tokenval}`;
    var tokenB = `${tokenvalB}`;
    if (!localStorage.getItem("visted")) {
      this.setState({
        login: "flex",
        logout: "none",
      });
      localStorage.setItem("visted", true);
    }
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
    // Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
    // await Geocode.fromAddress("3099 W Chapman Ave, Orange, CA 92868, USA").then(
    //   (response) => {
    //     console.log(response.results[0].address_components[2].long_name);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    // Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
    // await Geocode.fromAddress("Otay Ranch Dr, Chula Vista, CA 91915, USA").then(
    //   (response) => {
    //     var addr = response.results[0].address_components;
    //     var postal, city;
    //     var zip =
    //       response.results[0].address_components[addr.length - 2].long_name;
    //     for (
    //       var i = 0;
    //       i < response.results[0].address_components.length;
    //       ++i
    //     ) {
    //       if (
    //         response.results[0].address_components[i].types[0] == "postal_code"
    //       ) {
    //         postal = response.results[0].address_components[i].long_name;
    //       }
    //       if (
    //         response.results[0].address_components[i].types[0] == "locality"
    //       ) {
    //         city = response.results[0].address_components[i].long_name;
    //       }
    //     }
    //     console.log(postal);
    //     console.log(city);
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }

  onSubmitEventHandler = (e) => {
    e.preventDefault();

    window.scrollTo(0, 0);

    const payload = {
      emailb: this.state.email,
      passwordb: this.state.Password,
      fnameb: this.state.fname,
      lnameb: this.state.lname,
      bname: this.state.bname,
      description: this.state.description,
      address: this.state.Address,
      phoneNumber: this.state.PhoneNumber,
      businessCatagory: this.state.businessCatagory,
      accountHolderName: this.state.accountHolderName,
      accountHolderType: this.state.accountHolderType,
      routingNumber: this.state.routingNumber,
      accountNumber: this.state.accountNumber,
    };
    trackPromise(
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
          payload
        )
        .then((response) => {
          res = response.data;

          alert(res.message);

          if (res.check === 200) {
            this.props.history.push("/Dashboard");
          }

          console.log("#", response);
        })
        .catch(function (err) {
          console.log(err);
        })
    );
    this.setState({
      displaymessage: "visible",
    });
  };

  stripe = async (e) => {
    e.preventDefault();
    var stripeUrl;

    console.log(this.state.Address);

    Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
    var lat = "";
    var lng = "";
    var postal, city;

    try {
      await Geocode.fromAddress(`${this.state.Address}`).then(
        (response) => {
          lat = response.results[0].geometry.location.lat;
          lng = response.results[0].geometry.location.lng;
          console.log("lat and lng", lat, lng);
        },
        (error) => {
          this.setState({
            displayErrorText: "Invalid Address",
            displayError: "flex",
          });
          return;
        }
      );
    } catch (err) {
      this.setState({
        displayErrorText: "Invalid Address",
        displayError: "flex",
      });
      return;
    }

    await Geocode.fromAddress(`${this.state.Address}`).then(
      (response) => {
        for (
          var i = 0;
          i < response.results[0].address_components.length;
          ++i
        ) {
          if (
            response.results[0].address_components[i].types[0] == "postal_code"
          ) {
            postal = response.results[0].address_components[i].long_name;
          }
          if (
            response.results[0].address_components[i].types[0] == "locality"
          ) {
            city = response.results[0].address_components[i].long_name;
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );

    const data = {
      email: this.state.email,
      password: this.state.Password,
      fname: this.state.fname,
      lname: this.state.lname,
      bname: this.state.bname,
      description: this.state.description,
      address: this.state.Address,
      phoneNumber: this.state.PhoneNumber,
      website: this.state.website,
    };

    await axios
      .post("https://localmainstreetbackend.herokuapp.com/app/payment/data", {
        data,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });

    await axios
      .get(
        "https://localmainstreetbackend.herokuapp.com/app/payment/get-oauth-link",
        {
          "Content-Type": "application/json",
        }
      )
      .then(async (res) => {
        console.log(res);
        if (res.data.url) {
          stripeUrl = res.data.url;
        } else {
          alert("Something went wrong. We are sorry.");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "https://localmainstreetbackend.herokuapp.com/app/payment/stripeAccountId"
      )
      .then((res) => {
        stripeAccountId = res;
        console.log("boi", stripeAccountId);
      });

    const database = {
      emailb: this.state.email,
      passwordb: this.state.Password,
      fnameb: this.state.fname,
      lnameb: this.state.lname,
      bname: this.state.bname,
      description: this.state.description,
      address: this.state.Address,
      phoneNumber: this.state.PhoneNumber,
      website: this.state.website,
      stripeAccountId: "temporary",
      lat: lat,
      lng: lng,
      city: city,
      zipCode: postal,
    };

    trackPromise(
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
          database
        )
        .then(async (response) => {
          res = response.data;
          var m = "";
          var realres = "Success!";
          if (response.data.message === '"city" is required') {
            realres = "Something is wrong with your address.";
            m = "The address you provided may be a road.";
          }
          if (this.state.bname === "" || null || undefined) {
            realres = "Please enter your business name";
          }

          if (this.state.description === "" || null || undefined) {
            realres = "Please enter a description";
          }

          if (this.state.Address === "" || null || undefined) {
            realres = "Please enter an address";
          }

          if (this.state.PhoneNumber === "" || null || undefined) {
            realres = "Please enter a phone number";
          }
          if (
            res.message ===
            '"passwordb" length must be at least 6 characters long'
          ) {
            realres = "Passwords needs to be at least 6 characters long.";
          } else if (
            res.message === '"emailb" length must be at least 6 characters long'
          ) {
            realres = "Email is too short; needs to be at least 6 characters.";
          } else if (res.message === '"emailb" must be a valid email') {
            realres = "The email entered is not a valid email.";
          } else if (res.message === '"fnameb" is not allowed to be empty') {
            realres = "Please enter your first name.";
          } else if (res.message === '"lnameb" is not allowed to be empty') {
            realres = "Please enter your last name.";
          } else if (res.message === '"passwordb" is not allowed to be empty') {
            realres = "Please enter your password.";
          } else if (res.message === '"emailb" is not allowed to be empty') {
            realres = "Please enter your email.";
          } else if (
            res.message ===
            "Email already exists. Please choose a different email."
          ) {
            realres = "Email already exists. Please choose a different email.";
          } else if (res.message === '"website" must be a valid uri') {
            realres =
              "Make sure to include the 'https://' prefix for the website.";
            m = "Do not include any other text but the url.";
          }

          this.setState({
            displayError: "flex",
            displayErrorText: realres,
            displayErrorw: "flex",
            displayErrorTextw: m,
          });

          if (res.message === "Success!") {
            var payload = {
              email: this.state.email,
              password: this.state.Password,
            };

            await axios
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
              })
              .catch((err) => {
                console.log(err);
              });
            await axios
              .post(
                "https://localmainstreetbackend.herokuapp.com/app/contact/Bregistration",
                {
                  emailq: this.state.email,
                  name: this.state.fname,
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
            this.props.history.push({
              pathname: "/Redirecting",
              state: { stripeUrl: stripeUrl },
            });
          }

          if (res.check === 200) {
            return (
              <div className="modal" id="modal">
                <button
                  className="modalclose"
                  onClick={() => {
                    var x = document.getElementById("modal");
                    x.style.opacity = 0;
                    x.style.pointerEvents = "none";
                  }}
                >
                  close
                </button>
                <h3>Step One Complete!</h3>
                <button>On to step two!</button>
              </div>
            );
          }
          console.log("#", response);
        })
        .catch(function (err) {
          console.log(err);
        })
    );
  };

  stripeKey = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      var stripeUrl;

      console.log(this.state.Address);

      Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
      var lat = "";
      var lng = "";

      try {
        await Geocode.fromAddress(`${this.state.Address}`).then(
          (response) => {
            lat = response.results[0].geometry.location.lat;
            lng = response.results[0].geometry.location.lng;
            console.log("lat and lng", lat, lng);
          },
          (error) => {
            this.setState({
              displayErrorText: "Invalid Address",
              displayError: "flex",
            });
            return;
          }
        );
      } catch (err) {
        this.setState({
          displayErrorText: "Invalid Address",
          displayError: "flex",
        });
        return;
      }

      const data = {
        email: this.state.email,
        password: this.state.Password,
        fname: this.state.fname,
        lname: this.state.lname,
        bname: this.state.bname,
        description: this.state.description,
        address: this.state.Address,
        phoneNumber: this.state.PhoneNumber,
        website: this.state.website,
        lat: lat,
        lng: lng,
      };

      await axios
        .post("https://localmainstreetbackend.herokuapp.com/app/payment/data", {
          data,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });

      await axios
        .get(
          "https://localmainstreetbackend.herokuapp.com/app/payment/get-oauth-link",
          {
            "Content-Type": "application/json",
          }
        )
        .then(async (res) => {
          console.log(res);
          if (res.data.url) {
            stripeUrl = res.data.url;
          } else {
            alert("Something went wrong. We are sorry.");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(
          "https://localmainstreetbackend.herokuapp.com/app/payment/stripeAccountId"
        )
        .then((res) => {
          stripeAccountId = res;
          console.log("boi", stripeAccountId);
        });

      const database = {
        emailb: this.state.email,
        passwordb: this.state.Password,
        fnameb: this.state.fname,
        lnameb: this.state.lname,
        bname: this.state.bname,
        description: this.state.description,
        address: this.state.Address,
        phoneNumber: this.state.PhoneNumber,
        website: this.state.website,
        stripeAccountId: "temporary",
        lat: lat,
        lng: lng,
      };

      trackPromise(
        axios
          .post(
            "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
            database
          )
          .then(async (response) => {
            res = response.data;
            var m = "";
            var realres = "Success!";
            if (response.data.message === '"city" is required') {
              realres = "Something is wrong with your address.";
              m = "The address you provided may be a road.";
            }
            if (this.state.bname === "" || null || undefined) {
              realres = "Please enter your business name";
            }

            if (this.state.description === "" || null || undefined) {
              realres = "Please enter a description";
            }

            if (this.state.Address === "" || null || undefined) {
              realres = "Please enter an address";
            }

            if (this.state.PhoneNumber === "" || null || undefined) {
              realres = "Please enter a phone number";
            }
            if (
              res.message ===
              '"passwordb" length must be at least 6 characters long'
            ) {
              realres = "Passwords needs to be at least 6 characters long.";
            } else if (
              res.message ===
              '"emailb" length must be at least 6 characters long'
            ) {
              realres =
                "Email is too short; needs to be at least 6 characters.";
            } else if (res.message === '"emailb" must be a valid email') {
              realres = "The email entered is not a valid email.";
            } else if (res.message === '"fnameb" is not allowed to be empty') {
              realres = "Please enter your first name.";
            } else if (res.message === '"lnameb" is not allowed to be empty') {
              realres = "Please enter your last name.";
            } else if (
              res.message === '"passwordb" is not allowed to be empty'
            ) {
              realres = "Please enter your password.";
            } else if (res.message === '"emailb" is not allowed to be empty') {
              realres = "Please enter your email.";
            } else if (
              res.message ===
              "Email already exists. Please choose a different email."
            ) {
              realres =
                "Email already exists. Please choose a different email.";
            } else if (res.message === '"website" must be a valid uri') {
              realres =
                "Make sure to include the 'https://' prefix for the website.";
              m = "Do not include any other text but the url.";
            }

            this.setState({
              displayError: "flex",
              displayErrorText: realres,
              displayErrorw: "flex",
              displayErrorTextw: m,
            });

            if (res.message === "Success!") {
              var payload = {
                email: this.state.email,
                password: this.state.Password,
              };

              await axios
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
                })
                .catch((err) => {
                  console.log(err);
                });
              await axios
                .post(
                  "https://localmainstreetbackend.herokuapp.com/app/contact/Bregistration",
                  {
                    emailq: this.state.email,
                    name: this.state.fname,
                  }
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => console.log(err));
              this.props.history.push({
                pathname: "/Redirecting",
                state: { stripeUrl: stripeUrl },
              });
            }

            if (res.check === 200) {
              return (
                <div className="modal" id="modal">
                  <button
                    className="modalclose"
                    onClick={() => {
                      var x = document.getElementById("modal");
                      x.style.opacity = 0;
                      x.style.pointerEvents = "none";
                    }}
                  >
                    close
                  </button>
                  <h3>Step One Complete!</h3>
                  <button>On to step two!</button>
                </div>
              );
            }
            console.log("#", response);
          })
          .catch(function (err) {
            console.log(err);
          })
      );
    } else {
      return 0;
    }
  };

  render() {
    return (
      <div>
        <Loader />
        <div
          className="BLogin"
          style={{
            display: this.state.redirecting,
          }}
          onClick={() => {
            if (this.state.help === "flex") {
              this.setState({
                help: "none",
              });
            }
          }}
        >
          <div
            className="burger1"
            style={{
              height: "100%",
              position: "fixed",
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

          <div className="spacer"></div>
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
          <main className="mainBR">
            <div className="titleB">
              <h3 style={{ color: "#111111" }}>Business Registration</h3>
            </div>
            <form className="formBR">
              <a
                href="javascript:void(0)"
                className="link f"
                style={{ color: "#111111" }}
                onClick={() => {
                  this.setState({
                    help: "flex",
                  });
                }}
              >
                Help
              </a>
              <br></br>
              <label style={{ color: "#111111" }}>First Name</label>
              <br></br>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
                value={this.state.fname}
                onChange={(e) => this.setState({ fname: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>
              <label style={{ color: "#111111" }}>Last Name</label>
              <br></br>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name.."
                value={this.state.lname}
                onChange={(e) => this.setState({ lname: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>
              <label style={{ color: "#111111" }}>Email</label>
              <br></br>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>
              <label style={{ color: "#111111" }}>Password</label>
              <br></br>
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Your Password"
                value={this.state.Password}
                onChange={(e) => this.setState({ Password: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>
              <label style={{ color: "#111111" }}>Business Name</label>
              <br></br>
              <input
                type="text"
                id="bname"
                name="bname"
                placeholder="The name of your business"
                value={this.state.bname}
                onChange={(e) => this.setState({ bname: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>
              <label className="saysome" style={{ color: "#111111" }}>
                Say something about your business
              </label>
              <br></br>
              <textarea
                rows="16"
                cols="160"
                id="description"
                name="description"
                placeholder="This will be shown for the customer to see. Keep it short and sweet!"
                onChange={(e) => this.setState({ description: e.target.value })}
                value={this.state.description}
                style={{
                  width: 500,
                  height: 200,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              ></textarea>
              <br></br>
              <label style={{ color: "#111111" }}>Address</label>
              <br></br>

              <Autocomplete
                className="Autocomplete"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "#DDDDDD",
                }}
                value={this.state.Address}
                onChange={(e) => this.setState({ Address: e.target.value })}
                onPlaceSelected={(place) => {
                  this.setState({ Address: place.formatted_address });
                }}
                types={["address"]}
                onKeyDown={this.stripeKey}
                // componentRestrictions={{ country: "ru" }}
              />
              <br></br>
              <label style={{ color: "#111111" }}>Phone Number</label>
              <br></br>
              <input
                type="text"
                id="PhoneNumber"
                name="PhoneNumber"
                placeholder="Your Phone No."
                value={this.state.PhoneNumber}
                onChange={(e) => this.setState({ PhoneNumber: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>
              <label style={{ color: "#111111" }}>Business Website</label>
              <br></br>
              <input
                type="url"
                id="PhoneNumber"
                name="PhoneNumber"
                placeholder="If you don't have a website, leave it blank."
                value={this.state.website}
                onChange={(e) => this.setState({ website: e.target.value })}
                style={{
                  width: 500,
                  height: 50,
                  fontSize: 20,
                  backgroundColor: "#DDDDDD",
                }}
                onKeyDown={this.stripeKey}
              />
              <br></br>

              <br></br>

              <a
                href="javascript:void(0)"
                className="fancy-button pop-onhover bg-gradient3 oo ee ze"
                onClick={this.stripe}
                type="submit"
              >
                <span>
                  Register&nbsp;&nbsp;
                  <img
                    className="icons8"
                    alt="help local businesses during times of crisis"
                    src="data:image/png;base64,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"
                  />
                </span>
              </a>
              <br></br>

              <br></br>
              <h3
                style={{
                  textAlign: "center",
                  display: this.state.displayError,
                  margin: "auto",
                  color: "red",
                  width: "fit-content",
                }}
              >
                {this.state.displayErrorText}
              </h3>
              <h3
                style={{
                  textAlign: "center",
                  display: this.state.displayErrorw,
                  margin: "auto",
                  color: "red",
                  width: "fit-content",
                }}
              >
                {this.state.displayErrorTextw}
              </h3>
              <h6
                className="termsforstripe"
                style={{
                  marginBottom: "200px",
                }}
              >
                By registering your account, you agree to Stripe's&nbsp;
                <a href="https://stripe.com/legal" className="link">
                  Services Agreement
                </a>
                &nbsp;and the&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  rel="noopener noreferrer"
                  className="link"
                  href="https://stripe.com/connect-account/legal"
                >
                  Stripe Connected Account Agreement
                </a>
                .
              </h6>
              <br></br>
              <h6 className="termsforstripe">
                You also agree to LocalMainStreet's&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  rel="noopener noreferrer"
                  style={{
                    cursor: "pointer",
                  }}
                  href="/TermsOfUse"
                  // onClick={() => {
                  //   this.props.history.push("/TermsOfUse");
                  // }}
                >
                  TermsOfUse
                </a>
                &nbsp;and our&nbsp;{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  rel="noopener noreferrer"
                  style={{
                    cursor: "pointer",
                  }}
                  href="/PrivacyPolicy"
                  className="link"
                  // onClick={() => {
                  //   this.props.history.push("/PrivacyPolicy");
                  // }}
                >
                  PrivacyPolicy
                </a>
              </h6>
            </form>
          </main>
          <br></br>
        </div>
        <div
          style={{
            display: this.state.help,
            width: "300px",
            height: "600px",
          }}
          className="help"
        >
          <ul>
            <li
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "white",
              }}
            >
              How to get started
            </li>
            <br></br>
            <li>Fill in the fields bellow.</li>
            <li>
              In the next page, review your answers and fill in the missing
              fields.
            </li>
            <li>
              After you have registered, you can login to view your balance and
              dashboard.
            </li>
          </ul>
          <br></br>

          <ul>
            <li
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "white",
              }}
            >
              Steps on what to do after the crisis{" "}
            </li>
            <br></br>
            <li>
              When customers come into your business to redeem their gift cards,
              download the app and scan each one of them.
            </li>
            <li>
              The app will do everything for you, all you have to do is enter
              the amount the customer used up in his/her voucher.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default BusinessLogin;
