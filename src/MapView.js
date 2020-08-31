import React from "react";
import axios from "axios";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Geocode from "react-geocode";

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
            console.log(datum);
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

export default class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: this.props.userLocation,
      zoom: this.props.zoom,
      viewport: {
        latitude: 43,
        longitude: -75,
        zoom: 4,
        width: "100vw",
        height: "97vh",
      },
      latlng: this.props.location.state.latlng,
      selectedShop: null,
      pitch: 57.639834299290534,
      desc: "View Description",
      click: true,
      shopbusinessesmapbox: [],
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
    Geocode.setApiKey(process.env.REACT_APP_GKEY);
    console.log(this.props.userLocation);
    console.log(this.state.userLocation);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        var crd = pos.coords;
        console.log("das", crd);
        var city;
        this.setState({
          userLocation: {
            lat: Number(crd.latitude),
            lng: Number(crd.longitude),
          },
          zoom: 12,
          viewport: {
            latitude: Number(crd.latitude),
            longitude: Number(crd.longitude),
            zoom: 12,
            width: "100vw",
            height: "97vh",
            pitch: this.state.pitch,
          },
        });

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
        axios
          .get("https://api.ipify.org/?format=json")
          .then((res) => {
            const ip = res.data.ip;
            axios
              .get(`https://ipapi.co/${ip}/json/`)
              .then(async (res) => {
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
                    width: "100vw",
                    height: "97vh",
                    pitch: this.state.pitch,
                  },
                  shopbusinessesmapbox: this.props.location.state.latlng,
                });
                var city;
                await Geocode.fromLatLng(
                  res.data.geo.latitude,
                  res.data.geo.longitude
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
                      shopbusinessesmapbox: res.data.results.map(
                        (shop) => shop
                      ),
                    });
                  })
                  .catch((err) => {
                    console.error(err);
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
  }

  onClickEventHandler = (datum) => {
    console.log(datum);
    this.setState({
      selectedShop: datum,
    });
  };

  callback = (shop) => {
    console.log("shopdadasdsa", shop);
    this.setState({
      selectedShop: shop,
    });
  };

  render() {
    return (
      <div>
        <input
          style={{
            width: "100%",
            backgroundColor: "#7FDBFF",
            height: "75px",
            borderRadius: "0",
            zIndex: "999999",
            zIndex: 999999,
            fontSize: "30px",
          }}
          type="button"
          value="Go Back"
          onClick={() => {
            this.props.history.push("/Shop");
          }}
        ></input>
        <ReactMapGL
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -999999,
          }}
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          onViewportChange={(viewportUpdated) => {
            this.setState({
              viewport: viewportUpdated,
            });
          }}
          mapStyle="mapbox://styles/rherugu/ckcjl9otn3c4m1jp5xoguwg6o?optimize=true"
        >
          <Markers
            data={this.state.shopbusinessesmapbox}
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
      </div>
    );
  }
}
