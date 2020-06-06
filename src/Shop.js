import React, { useState, useEffect } from "react";
import "./Shop.css";
import axios from "axios";
import Component from "@reactions/component";
import { toast } from "react-toastify";
import MediaCard from "./Card";
import Loader from "./Loader";
import { trackPromise } from "react-promise-tracker";
import "react-toastify/dist/ReactToastify.css";
import Geocode from "react-geocode";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import $ from "jquery";
import "jquery-mousewheel";

var obj;
var addressArray = [
  { lat: 0, lng: 0 },
  { lat: 10, lng: 56 },
  { lat: 4, lng: 98 },
];

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: null,
      center: {},
      bname: null,
      description: null,
    };
  }

  render() {
    return (
      <GoogleMap
        onClick={() => {
          if (this.state.shop != null) {
            this.setState({
              shop: null,
            });
          }
        }}
        center={this.props.userLocation}
        defaultZoom={this.props.zoom}
        zoom={this.props.zoom}
        defaultCenter={this.props.userLocation}
        options={this.props.options}
      >
        {this.props.latlng.map((latlng) => (
          <Marker
            position={latlng.data}
            key={Math.floor(100000 + Math.random() * 900000)}
            onClick={() => {
              this.setState({
                shop: {
                  lat: Number(latlng.data.lat),
                  lng: Number(latlng.data.lng),
                  bname: latlng.bname,
                  description: latlng.address,
                  website: latlng.website,
                  email: latlng.emailb,
                  phone: latlng.phoneNumber,
                },
              });
            }}
          />
        ))}

        {this.state.shop && (
          <InfoWindow
            position={{
              lat: Number(this.state.shop.lat),
              lng: Number(this.state.shop.lng),
            }}
            onCloseClick={() => {
              this.setState({
                shop: null,
              });
            }}
            key={Math.floor(100000 + Math.random() * 900000)}
          >
            <div
              style={{
                margin: "10px",
              }}
            >
              <h3>{this.state.shop.bname}</h3>
              <h4>{this.state.shop.description}</h4>
              <a
                href={this.state.shop.website}
                target="_blank"
                className="link"
                rel="noopener noreferrer"
              >
                {this.state.shop.website !== " "
                  ? "Click to go to the website"
                  : ""}
              </a>
              <p>Email: {this.state.shop.email}</p>
              <p>Phone: {this.state.shop.phone}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

const MapWrapped = withGoogleMap(Map);

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
      bname: [],
      name: "SmartTicketing",
      businessCatagory: "",
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      search: "",
      modal: true,
      addresses: [],
      currentPosition: {},
      DescName: [],
      userLocation: { lat: 39.0119, lng: -98.4842 },
      zoom: 5,
    };
    this.bname = "";
  }
  success = (position) => {
    this.setState({
      userLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 7.8,
    });
  };
  error = (err) => {
    console.error(err);
  };
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
          axios
            .post(
              "https://localmainstreetbackend.herokuapp.com/app/contact/sendqrcodetoBusiness",
              {
                emailq: res.data.emailbusiness,
                amount: res.data.amountPaid,
                bname: res.data.businessName,
                name: `${localStorage.getItem("fname")} ${localStorage.getItem(
                  "lname"
                )}`,
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
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
            .then(async (response) => {
              this.setState({ shops: response.data });

              Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
              if (navigator.geolocation) {
                const options = {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0,
                };

                navigator.geolocation.getCurrentPosition(
                  this.success,
                  this.error,
                  options
                );
              } else {
                this.setState({
                  userLocation: { lat: 40.3583, lng: -74.26 },
                  zoom: 8,
                });
              }

              addressArray = [];
              addressArray = this.state.shops.map((shop) => shop);
              var busName = this.state.shops.map((shop) => shop.bname);
              var DescName = this.state.shops.map((shop) => shop.address);

              var addressSet = [];

              for (var count = 0; count < addressArray.length; count++) {
                const response = await Geocode.fromAddress(
                  addressArray[count].address
                );

                addressArray[count].data =
                  response.results[0].geometry.location;

                this.setState({
                  addresses: addressArray,
                });
              }
            })

            .catch((err) => {
              console.log(err);
              localStorage.setItem("token", "undefined");
              localStorage.setItem("Btoken", "undefined");
              this.onClickLogin();
            })
        );
      } else {
        localStorage.setItem("token", "undefined");
        localStorage.setItem("Btoken", "undefined");
        this.onClickLogin();
      }
    } else {
    }
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
  keySearch2 = (e) => {
    if (e.keyCode === 13) {
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
    } else {
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
    $(".gridlist").mousewheel(function (event, delta) {
      this.scrollLeft -= delta * 30;

      event.preventDefault();
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
        <br className="brDisplay"></br>
        <br className="brDisplay"></br>
        <br className="brDisplay"></br>
        <div className="search">
          <label
            style={{
              cursor: "text",
            }}
            className="Search_Businesses"
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
              onKeyDown={this.keySearch2}
            ></input>
            {/* <input
              type="button"
              className="searchSubmit"
              value="Search"
              onClick={this.handleSearch}
            ></input> */}
          </div>
        </div>

        <div
          className="gridlist"
          style={
            {
              // width: "50vw",
              // marginTop: "26vh !important",
              // // all: "unset",
            }
          }
        >
          {this.state.shops.map((shop) => (
            <MediaCard
              card={shop}
              className="MediaCard"
              bname={shop.bname}
              emailb={shop.emailb}
              description={shop.description}
              phoneNumber={shop.phoneNumber}
              history={this.props.history}
              businessCatagory={shop.businessCatagory}
              stripeId={shop.stripeAccountId}
              address={shop.address}
              website={shop.website}
              key={Math.floor(100000 + Math.random() * 900000)}
            />
          ))}
        </div>
        <div className="mapGoogle">
          {/* {this.state.currentPosition !== {} && ( */}
          <MapWrapped
            currentPosition={this.state.currentPosition}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GKEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            latlng={this.state.addresses}
            userLocation={this.state.userLocation}
            options={{ gestureHandling: "auto", streetViewControl: false }}
            zoom={this.state.zoom}
          />
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default Shop;
