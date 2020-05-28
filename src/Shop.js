import React from "react";
import "./Shop.css";
import axios from "axios";
import Component from "@reactions/component";
import { toast } from "react-toastify";
import MediaCard from "./Card";
import Loader from "./Loader";
import { trackPromise } from "react-promise-tracker";
import "react-toastify/dist/ReactToastify.css";
import Geocode from "react-geocode";

class Shop extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      price: 25,
      name: "SmartTicketing",
      businessCatagory: "",
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      search: "",
      modal: true,
    };
    this.bname = "";
  }

  async componentDidMount() {
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
    const headers = {
      "auth-token": tokenval,
    };
    var check = "";

    await axios
      .get(
        "https://localmainstreetbackend.herokuapp.com/app/payment/encryption"
      )
      .then((res) => {
        if (res.data.status === "success") {
          check = undefined;
          var dl = {
            name: res.data.businessName,
            amountPaid: res.data.amountPaid,
            amountLeft: 4,
            QRcode: res.data.message,
          };

          if (tokenB || tokenC === "undefined") {
            this.props.history.push({
              pathname: "/QRCode",
              state: {
                value: res.data.message,
                bname: res.data.businessName,
              },
            });
            return 0;
          } else if (tokenB && tokenC === "undefined") {
            this.props.history.push({
              pathname: "/QRCode",
              state: {
                value: res.data.message,
                bname: res.data.businessName,
              },
            });
            return 0;
          } else {
            this.props.history.push({
              pathname: "/QRCode",
              state: {
                value: res.data.message,
                bname: res.data.businessName,
              },
            });
          }
          this.props.history.push({
            pathname: "/QRCode",
            state: {
              value: res.data.message,
              bname: res.data.businessName,
            },
          });
          return 0;
        } else if (res.data.status === "failure") {
          check = "yes";
          console.log("User has not bought anything yet.");
        }
      });
    if (check) {
      if (tokenval) {
        trackPromise(
          axios
            .get(
              "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
              { headers }
            )
            .then((response) => {
              this.setState({ shops: response.data });
              // shops = this.state.shops.map((shop) => shop);
            })
            .catch((err) => {
              this.onClickLogin();
            })
        );
      } else {
        this.onClickLogin();
      }
    } else {
    }

    return (
      <div
        style={{
          zIndex: 999999999999999999999999999999999999999999999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "50%",
          backgroundColor: "red",
        }}
      >
        // When I stop working, you stop working // when I start working, you
        start working, even at 6(sometimes) // you will work as diligently as me
        // Deal?
        <h1>Please contribute and Donate to us.</h1>
        <h3>Even 1 dollar makes a difference!</h3>
      </div>
    );
  }

  optionChange = (e) => {
    this.setState({ businessCatagory: e.target.value });
  };

  handleOpen = () => {
    this.setState({
      open: "true",
    });
  };
  handleClose = () => {
    this.setState({
      open: "false",
    });
  };

  handleSearch = () => {
    if (/\S/.test(this.state.search)) {
      const tokenval = localStorage.getItem("token");
      const headers = {
        "auth-token": tokenval,
      };
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
          {
            query: this.state.search,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            shops: res.data.result.map((shop) => shop),
          });
          console.log(this.state.shops);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (this.state.search === "" || null || undefined) {
      const tokenval = localStorage.getItem("token");
      const headers = {
        "auth-token": tokenval,
      };
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
          {
            query: this.state.search,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            shops: res.data.result.map((shop) => shop),
          });
          console.log(this.state.shops);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return 0;
    }
  };

  keySearch = (e) => {
    this.setState({
      search: e.target.value,
    });
    // if (e.keyCode == 13) {
    if (/\S/.test(this.state.search)) {
      const tokenval = localStorage.getItem("token");
      const headers = {
        "auth-token": tokenval,
      };
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
          {
            query: this.state.search,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            shops: res.data.result.map((shop) => shop),
          });
          console.log(this.state.shops);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (this.state.search === "" || null || undefined) {
      const tokenval = localStorage.getItem("token");
      const headers = {
        "auth-token": tokenval,
      };
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
          {
            query: this.state.search,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({
            shops: res.data.result.map((shop) => shop),
          });
          console.log(this.state.shops);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return 0;
    }
  };

  render() {
    const phoneNumber = this.state.shops.map((shop) => {
      return <p key={shop._id}>{shop.phoneNumber}</p>;
    });

    const bname = this.state.shops.map((shop) => {
      return <p key={shop._id}>{shop.bname}</p>;
    });
    const description = this.state.shops.map((shop) => {
      return <p key={shop._id}>{shop.description}</p>;
    });

    return (
      <div className="Shop">
        <div
          className="burger1"
          style={{
            height: "100%",
            opacity: this.state.burger,
            pointerEvents: this.state.pointerEvents,
            zIndex: "900909",
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

        <header
          className="Home-Header"
          style={{
            zIndex: "900909",
          }}
        >
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="search">
          <label
            style={{
              cursor: "text",
            }}
          >
            Search Businesses
          </label>
          <div
            className="search-main"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              placeholder="Enter search query here"
              type="text"
              className="searchBar"
              value={this.state.search}
              onChange={this.keySearch}
              // onKeyDown={this.keySearch}
            ></input>
            <input
              type="button"
              className="searchSubmit"
              value="Search"
              onClick={this.handleSearch}
            ></input>
            <br></br>
            {/* <input
              type="button"
              className="searchSubmit"
              value="View businesses based on your location"
              onClick={() => {
                var lat;
                var lng;
                navigator.geolocation.getCurrentPosition((position) => {
                  console.log("Latitude is :", position.coords.latitude);
                  console.log("Longitude is :", position.coords.longitude);
                  lat = position.coords.latitude;
                  lng = position.coords.longitude;
                  Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
                  Geocode.fromLatLng(lat, lng).then(
                    (response) => {
                      const address = response.results[0].formatted_address;
                      console.log(address);
                    },
                    (error) => {
                      console.error(error);
                    }
                  );
                });
              }}
            ></input> */}
            <br></br>
            {/* <a
              href="javascript:void(0)"
              style={{
                width: "fit-content",
                margin: "auto",
              }}
              onClick={() => {
                this.props.history.push({
                  pathname: "/FullMap",
                  state: {
                    address: this.state.shops.map((shop) => shop.address),
                    bname: this.state.shops.map((shop) => shop.bname),
                  },
                });
              }}
              className="link"
            >
              View Map
            </a> */}
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>

        <div
          className="gridlist"
          style={{
            width: "90%",
          }}
        >
          {this.state.shops.map((shop) => (
            <MediaCard
              card={shop}
              className="MediaCard"
              bname={shop.bname}
              description={shop.description}
              phoneNumber={shop.phoneNumber}
              history={this.props.history}
              businessCatagory={shop.businessCatagory}
              stripeId={shop.stripeAccountId}
              address={shop.address}
            />
          ))}
        </div>
        <p className="end">It looks like you've reached the end.</p>
      </div>
    );
  }
}

export default Shop;
