import React, { useState, useEffect } from "react";
import "./Shop.css";
import axios from "axios";
import Component from "@reactions/component";
import MediaCard from "./Card";
import Loader from "./Loader";
import { trackPromise } from "react-promise-tracker";
import "react-toastify/dist/ReactToastify.css";
import Geocode from "react-geocode";
import "jquery-mousewheel";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

var obj;
var addressArray = [
  { lat: 0, lng: 0 },
  { lat: 10, lng: 56 },
  { lat: 4, lng: 98 },
];
var limit = 12;
var limitcounter = 1;

const qs = require("query-string");

class Markers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedShop: null,
    };
  }
  render() {
    const { data, onClick } = this.props;
    return data.map((datum) => (
      <Marker
        key={Math.floor(100000 + Math.random() * 900000)}
        longitude={datum.lng}
        latitude={datum.lat}
      >
        <svg
          height="40"
          width="40"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              selectedShop: datum,
            });
            this.props.callback(datum);
          }}
          className="markersvgcircle"
        >
          {/* <circle
            
            cx="10"
            cy="10"
            r="10"
            fill="#0074D9"
          /> */}
          <path
            fill="#e3362d"
            class="path1"
            style={{
              transform: "scale(2)",
            }}
            d="M8 2.1c1.1 0 2.2 0.5 3 1.3 0.8 0.9 1.3 1.9 1.3 3.1s-0.5 2.5-1.3 3.3l-3 3.1-3-3.1c-0.8-0.8-1.3-2-1.3-3.3 0-1.2 0.4-2.2 1.3-3.1 0.8-0.8 1.9-1.3 3-1.3z"
          />
          <path
            fill="#fff"
            class="path2"
            style={{
              transform: "scale(2)",
            }}
            d="M8 15.8l-4.4-4.6c-1.2-1.2-1.9-2.9-1.9-4.7 0-1.7 0.6-3.2 1.8-4.5 1.3-1.2 2.8-1.8 4.5-1.8s3.2 0.7 4.4 1.9c1.2 1.2 1.8 2.8 1.8 4.5s-0.7 3.5-1.8 4.7l-4.4 4.5zM4 10.7l4 4.1 3.9-4.1c1-1.1 1.6-2.6 1.6-4.2 0-1.5-0.6-2.9-1.6-4s-2.4-1.7-3.9-1.7-2.9 0.6-4 1.7c-1 1.1-1.6 2.5-1.6 4 0 1.6 0.6 3.2 1.6 4.2v0z"
          />
          <path
            fill="#fff"
            class="path3"
            style={{
              transform: "scale(2)",
            }}
            d="M8 16l-4.5-4.7c-1.2-1.2-1.9-3-1.9-4.8 0-1.7 0.6-3.3 1.9-4.6 1.2-1.2 2.8-1.9 4.5-1.9s3.3 0.7 4.5 1.9c1.2 1.3 1.9 2.9 1.9 4.6 0 1.8-0.7 3.6-1.9 4.8l-4.5 4.7zM8 0.3c-1.6 0-3.2 0.7-4.3 1.9-1.2 1.2-1.8 2.7-1.8 4.3 0 1.7 0.7 3.4 1.8 4.5l4.3 4.5 4.3-4.5c1.1-1.2 1.8-2.9 1.8-4.5s-0.6-3.1-1.8-4.4c-1.2-1.1-2.7-1.8-4.3-1.8zM8 15.1l-4.1-4.2c-1-1.2-1.7-2.8-1.7-4.4s0.6-3 1.7-4.1c1.1-1.1 2.6-1.7 4.1-1.7s3 0.6 4.1 1.7c1.1 1.1 1.7 2.6 1.7 4.1 0 1.6-0.6 3.2-1.7 4.3l-4.1 4.3zM4.2 10.6l3.8 4 3.8-4c1-1 1.6-2.6 1.6-4.1s-0.6-2.8-1.6-3.9c-1-1-2.4-1.6-3.8-1.6s-2.8 0.6-3.8 1.6c-1 1.1-1.6 2.4-1.6 3.9 0 1.6 0.6 3.1 1.6 4.1v0z"
          />
        </svg>
      </Marker>
    ));
  }
}

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: this.props.userLocation,
      zoom: this.props.zoom,
      viewport: {
        latitude: 43,
        longitude: -75,
        zoom: 4,
        width: "68vw",
        height: "87vh",
      },
      latlng: this.props.latlng,
      selectedShop: null,
      pitch: 57.639834299290534,
      desc: "View Description",
      click: true,
    };
  }
  listener = (e) => {
    if (e.key === "Escape") {
      this.setState({
        selectedShop: null,
      });
    }
  };

  componentDidMount() {
    this.setState({
      viewport: {
        latitude: this.state.userLocation.lat,
        longitude: this.state.userLocation.lng,
        zoom: this.state.zoom,
        width: "68vw",
        height: "87vh",
        pitch: this.state.pitch,
      },
    });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        this.setState({
          userLocation: {
            lat: Number(pos.coords.latitude),
            lng: Number(pos.coords.longitude),
          },
          zoom: 12,
          viewport: {
            latitude: Number(pos.coords.latitude),
            longitude: Number(pos.coords.longitude),
            zoom: 12,
            width: "68vw",
            height: "87vh",
            pitch: this.state.pitch,
          },
        });
      },
      (err) => {
        axios
          .get("https://api.ipify.org/?format=json")
          .then((res) => {
            const ip = res.data.ip;
            axios
              .get(`https://ipapi.co/${ip}/json/`)
              .then((res) => {
                this.setState({
                  userLocation: {
                    lat: Number(res.data.latitude),
                    lng: Number(res.data.longitude),
                  },
                  zoom: 12,
                  viewport: {
                    latitude: Number(res.data.latitude),
                    longitude: Number(res.data.longitude),
                    zoom: 12,
                    width: "68vw",
                    height: "87vh",
                    pitch: this.state.pitch,
                  },
                });
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    );

    window.addEventListener("keydown", this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listener);
    window.removeEventListener("scroll", this.scrollEventListener);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     userLocation: nextProps.userLocation,
  //     zoom: nextProps.zoom,
  //     viewport: {
  //       latitude: this.state.userLocation.lat,
  //       longitude: this.state.userLocation.lng,
  //       zoom: this.state.zoom,
  //       width: "68vw",
  //       height: "87vh",
  //       pitch: this.state.pitch,
  //     },
  //   });
  // }

  onClickEventHandler = (datum) => {
    console.log(datum);
    this.setState({
      selectedShop: datum,
    });
  };

  callback = (shop) => {
    this.setState({
      selectedShop: shop,
    });
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        onViewportChange={(viewportUpdated) => {
          this.setState({
            viewport: viewportUpdated,
          });
        }}
        onClick={() => {
          if (this.state.click) {
            window.location = "#";
            this.setState({
              click: false,
            });
          }
        }}
        mapStyle="mapbox://styles/rherugu/ckcjl9otn3c4m1jp5xoguwg6o?optimize=true"
      >
        <Markers
          data={this.props.latlng}
          onClick={this.onClickEventHandler}
          callback={this.callback}
        />
        {this.state.selectedShop && (
          <Popup
            latitude={this.state.selectedShop.lat}
            longitude={this.state.selectedShop.lng}
            onClose={() => {
              this.setState({
                selectedShop: null,
              });
            }}
            closeOnClick={false}
          >
            <div style={{ width: "400px" }}>
              <h3>{this.state.selectedShop.bname}</h3>
              <h4>{this.state.selectedShop.address}</h4>

              <br></br>
              <a
                href={this.state.selectedShop.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.state.selectedShop.website !== " "
                  ? "Click to go to the website"
                  : ""}
              </a>
              <p>Email: {this.state.selectedShop.emailb}</p>
              <p>Phone: {this.state.selectedShop.phoneNumber}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChange = (e) => {
    // this.props.onSearchChange(e.target.value);
  };
  render() {
    return (
      <input
        placeholder="Search by City, Zip Code, or Name"
        type="text"
        className="searchBar redinput"
        style={{
          borderRadius: "6px 0px 0px 6px",
        }}
        id="myInput"
        onChange={this.handleChange}
        // onKeyDown={this.keySearch}
      ></input>
    );
  }
}

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
    localStorage.setItem("type", "loggedout");
    this.props.history.push("/login");
  };

  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      loadingMAP: true,
      search: "",
      modal: true,
      addresses: [],
      currentPosition: {},
      userLocation: { lat: 39.0119, lng: -98.4842 },
      zoom: 4,
      loadingMAP2: "block",
      dashboardoftheB: "none",
      FetchingData: "block",
      showMap: "ddaadsdas",
      gridlistDisplay: "flex",
      showmaptext: "Show map",
      mapMapBoxDisplayBlockNone: "block",
      loadingShopBusinesses: "none",
      shopbusinessesmapbox: [],
      loadmorebtndisplayshopcount: "block",
      loadmorebtntextshopcount: "Loading...",
      count: 0,
      searchtest: "",
      dashboardoftheC: "none",
    };
  }
  success = (position) => {
    window.location = "#";
    this.setState({
      userLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 12,
    });
  };
  error = (err) => {
    console.error(err);
    window.location = "#";
    axios
      .get("https://api.ipify.org/?format=json")
      .then((res) => {
        const ip = res.data.ip;
        axios
          .get(`http://ip-api.com/json/${ip}`)
          .then((res) => {
            this.setState({
              userLocation: {
                lat: res.data.lat,
                lng: res.data.lon,
              },
              zoom: 12,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  scrollEventListener = (e) => {
    this.handleScrollLoadMore(e);
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollEventListener);
  }
  async componentDidMount() {
    this.setState({
      loadingShopBusinesses: "flex",
    });
    console.log(this.props.userLocation);
    this.setState({
      FetchingData: "block",
    });
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
      this.setState({ dashboardoftheB: "flex", dashboardoftheC: "none" });
    } else if (localStorage.getItem("type") === "customer") {
      this.setState({ dashboardoftheB: "none", dashboardoftheC: "flex" });
    } else {
      this.setState({ dashboardoftheB: "none", dashboardoftheC: "none" });
    }

    var limit = 12;
    const headers = {
      "auth-token": tokenval,
      limit: limit,
    };
    const headers2 = {
      "auth-token": tokenval,
      limit: limit + limit,
    };
    // this.scrollListener = window.addEventListener("scroll", (e) => {
    //   this.handleScrollLoadMore(e);
    // });

    var check = "";
    // trackPromise(

    const parsed = qs.parse(this.props.location.search);
    console.log(parsed.search);

    if (parsed.search !== undefined || null || NaN) {
      console.log("search ther 3847dh");
      const tokenval = localStorage.getItem("token");
      const headers = {
        "auth-token": tokenval,
      };
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
          {
            query: parsed.search,
          },
          { headers }
        )
        .then((res) => {
          this.setState({ loadmorebtndisplayshopcount: "none" });
          this.setState({
            shops: res.data.results.map((shop) => shop),
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const headers222 = {
        "auth-token": localStorage.getItem("token"),
        page: 0,
      };
      axios
        .get(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/count"
        )
        .then((res) => {
          this.setState({
            count: res.data,
          });
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      await axios
        .get(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/pagination",
          {
            headers222,
          }
        )
        .then((response) => {
          this.setState({
            shops: response.data,
          });
          console.log(limitcounter);
          // limitcounter++;
        })

        .catch((err) => {
          console.error(err);
        });
      this.scrollListener = window.addEventListener(
        "scroll",
        this.scrollEventListener
      );
    }

    // );

    this.setState({
      loadingMAP: false,
      loadingMAP2: "none",
    });

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
    this.setState({
      FetchingData: "none",
    });
    this.setState({
      loadingShopBusinesses: "none",
    });
    Geocode.setApiKey(process.env.REACT_APP_GKEY);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        var crd = pos.coords;
        console.log("das", crd);
        var city;

        await Geocode.fromLatLng(crd.latitude, crd.longitude).then(
          (response) => {
            console.log(response);
            for (
              var i = 0;
              i < response.results[0].address_components.length;
              ++i
            ) {
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
        city = city.replace("Township", "");
        console.log(city);
        const tokenval = localStorage.getItem("token");
        const headers = {
          "auth-token": tokenval,
        };
        axios
          .post(
            "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
            {
              query: city,
            },
            { headers }
          )
          .then((res) => {
            console.log(res);
            this.setState({
              shopbusinessesmapbox: res.data.results.map((shop) => shop),
            });
          })
          .catch((err) => {
            console.error(err);
          });
      },
      (err) => {
        var city;
        axios.get("https://api.ipify.org/?format=json").then((res) => {
          const ip = res.data.ip;
          axios
            .get(`https://ipapi.co/${ip}/json/`)
            .then(async (res) => {
              await Geocode.fromLatLng(
                res.data.latitude,
                res.data.longitude
              ).then(
                (response) => {
                  console.log(response);
                  for (
                    var i = 0;
                    i < response.results[0].address_components.length;
                    ++i
                  ) {
                    if (
                      response.results[0].address_components[i].types[0] ==
                      "locality"
                    ) {
                      city =
                        response.results[0].address_components[i].long_name;
                    }
                  }
                },
                (error) => {
                  console.error(error);
                }
              );
              const tokenval = localStorage.getItem("token");
              const headers = {
                "auth-token": tokenval,
              };
              axios
                .post(
                  "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
                  {
                    query: city,
                  },
                  { headers }
                )
                .then((res) => {
                  console.log(res);
                  this.setState({
                    shopbusinessesmapbox: res.data.results.map((shop) => shop),
                  });
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    );

    // axios
    //   .get(
    //     "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop"
    //   )
    //   .then((response) => {
    //     this.setState({
    //       shopbusinessesmapbox: response.data,
    //     });
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //     this.onClickLogin();
    //   });
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
    this.setState({
      loadingShopBusinesses: "flex",
    });
    var inputVal = document.getElementById("myInput").value;
    this.setState({
      search: inputVal,
    });

    if (!inputVal.replace(/\s/g, "").length) {
      if (inputVal === "") {
        const parsed = qs.parse(this.props.location.search);
        if (parsed.search !== undefined || null || NaN) {
          window.location = window.location.href.split("?")[0];
        }
        const headers222 = {
          "auth-token": localStorage.getItem("token"),
          page: 0,
        };
        axios
          .get(
            "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/pagination",
            {
              headers222,
            }
          )
          .then((response) => {
            window.addEventListener("scroll", this.scrollEventListener);
            this.setState({ loadmorebtndisplayshopcount: "block" });
            this.setState({
              shops: response.data,
            });
            console.log(limitcounter);
            this.setState({
              loadingShopBusinesses: "none",
            });
            // limitcounter++;
          })

          .catch((err) => {
            console.error(err);
          });
      } else {
      }
    } else {
      const tokenval = localStorage.getItem("token");
      const headers = {
        "auth-token": tokenval,
      };
      axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
          {
            query: inputVal,
          },
          { headers }
        )
        .then((res) => {
          window.removeEventListener("scroll", this.scrollEventListener);
          this.setState({ loadmorebtndisplayshopcount: "none" });
          this.setState({
            shops: res.data.results.map((shop) => shop),
          });
          this.setState({
            loadingShopBusinesses: "none",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // keySearch = async (e) => {
  //   if (e.keyCode == 13) {
  //     if (!this.state.search.replace(/\s/g, "").length) {
  //       if (this.state.search === "") {
  //         const headers222 = {
  //           "auth-token": localStorage.getItem("token"),
  //           page: 0,
  //         };
  //         axios
  //           .get("https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/pagination", {
  //             headers222,
  //           })
  //           .then((response) => {
  //             this.setState({
  //               shops: response.data,
  //             });
  //             console.log(limitcounter);
  //             // limitcounter++;
  //           })

  //           .catch((err) => {
  //             console.error(err);
  //           });
  //       } else {
  //       }
  //     } else {
  //       const tokenval = localStorage.getItem("token");
  //       const headers = {
  //         "auth-token": tokenval,
  //       };
  //       axios
  //         .post(
  //           "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/search",
  //           {
  //             query: this.state.search,
  //           },
  //           { headers }
  //         )
  //         .then((res) => {
  //           this.setState({ loadmorebtndisplayshopcount: "none" });
  //           this.setState({
  //             shops: res.data.results.map((shop) => shop),
  //           });
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //   } else {
  //     return 0;
  //   }
  // };
  loadMore = async () => {
    var top = window.pageYOffset || document.documentElement.scrollTop,
      left = window.pageXOffset || document.documentElement.scrollLeft;
    const headers = {
      "auth-token": localStorage.getItem("token"),
      page: limitcounter,
    };
    // axios
    //   .get("https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/count")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    let shopsStatic = this.state.shops;

    var checker = 17 * limitcounter;
    if (this.state.count <= checker) {
      this.setState({ loadmorebtndisplayshopcount: "none" });
    } else {
      this.setState({
        loadmorebtntextshopcount: "Loading...",
      });
      axios
        .get(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/pagination",
          {
            headers,
          }
        )
        .then((response) => {
          var total = shopsStatic.concat(response.data);

          this.setState({
            shops: total,
          });

          window.scrollTo(left, top);
          this.setState({
            loadmorebtntextshopcount: "Loading...",
          });
        })

        .catch((err) => {
          console.error(err);
        });

      limitcounter++;
    }
  };
  handleScrollLoadMore = () => {
    var lastLi = document.getElementById("lastscrollshop");
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastLiOffset) {
      this.loadMore();
    }
  };

  handleSearchBarChange = (val) => {
    this.setState({
      search: val,
    });
  };

  render() {
    // const phoneNumber = this.state.shops.map((shop) => {
    //   return <p key={shop._id}>{shop.phoneNumber}</p>;
    // });

    // const bname = this.state.shops.map((shop) => {
    //   return <p key={shop._id}>{shop.bname}</p>;
    // });
    // const description = this.state.shops.map((shop) => {
    //   return <p key={shop._id}>{shop.description}</p>;
    // });

    return (
      <div className="Shop">
        <div
          className="loaderwrapper"
          style={{
            zIndex: 9999999999,
            display: this.state.loadingShopBusinesses,
          }}
        >
          <div className="loader"></div>
        </div>
        <div
          className="burger1 khdsaid12e"
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
              <a href="/CustomerDashboard">
                <span
                  className="Hheading1"
                  style={{ display: this.state.dashboardoftheC }}
                >
                  <span>Dashboard</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </a>
              <span onClick={this.onClickLogout}>Logout</span>
            </h3>
          </div>
        </header>

        <div
          className="gridlist"
          style={{
            // width: "50vw",
            // marginTop: "26vh !important",
            // // all: "unset",
            display: this.state.gridlistDisplay,
          }}
        >
          <div className="search">
            <label
              style={{
                cursor: "text",
              }}
              className="Search_Businesses"
            >
              Search by City, Zip, or Name
              {/* <a
              href="javascript:void(0)"
              onClick={() => {
                if (this.state.gridlistDisplay === "flex") {
                  this.setState({
                    gridlistDisplay: "none",
                    showmaptext: "Back",
                    mapMapBoxDisplayBlockNone: "block",
                  });
                } else if (this.state.gridlistDisplay === "none") {
                  this.setState({
                    gridlistDisplay: "flex",
                    showmaptext: "Show Map",
                    mapMapBoxDisplayBlockNone: "none",
                  });
                }
              }}
              className="link"
            >
              {this.state.showmaptext}
            </a> */}
            </label>
            <div
              className="search-main"
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SearchBar onSearchChange={this.handleSearchBarChange} />
              <input
                type="button"
                className="searchSubmit"
                value="Search"
                style={{
                  backgroundColor: "#FFDC00",
                  cursor: "pointer",
                  marginTop: "6px",
                  borderRadius: "0px 0px 0px 0px",
                  width: "100px",
                }}
                onClick={this.handleSearch}
              ></input>
              <input
                type="button"
                className="searchSubmit"
                value="View Full Map"
                style={{
                  backgroundColor: "#FFDC00",
                  cursor: "pointer",
                  marginTop: "6px",
                  borderRadius: "0px 6px 6px 0px",
                  width: "200px",
                }}
                onClick={() => {
                  this.props.history.push({
                    pathname: "/MapView",
                    state: {
                      latlng: this.state.shopbusinessesmapbox,
                    },
                  });
                }}
              ></input>
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              display: this.state.FetchingData,
            }}
          >
            Fetching Data...
          </p>
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
          <br></br>
          <input
            type="button"
            value={this.state.loadmorebtntextshopcount}
            style={{
              backgroundColor: "#ffc728",
              display: this.state.loadmorebtndisplayshopcount,
            }}
            id="lastscrollshop"
            onClick={this.loadMore}
          ></input>
        </div>
        <div className="mapMapBox">
          <div
            style={{
              width: "fit-content",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <i
              style={{
                display: this.state.loadingMAP2,
                // width: "fit-content",
                // margin: "5px auto",
              }}
              class="fa fa-refresh fa-spin"
            ></i>

            {this.state.loadingMAP ? "Loading The Map..." : ""}
          </div>
          {/* {this.state.currentPosition !== {} && ( */}

          <MapBox
            currentPosition={this.state.currentPosition}
            latlng={this.state.shopbusinessesmapbox.map((shop) => shop)}
            userLocation={this.state.userLocation}
            zoom={this.state.zoom}
            shop={this.state.shops}
          />

          {/* )} */}
        </div>
      </div>
    );
  }
}

export default Shop;
