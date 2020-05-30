// prettier-ignore

import React, { useEffect, useReducer, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Buy.css";
import axios from "axios";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import StripeCheckout from "react-stripe-checkout";
import Geocode from "react-geocode";
import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NodeGeocoder = require("node-geocoder");

var bc;
var lati = 0;
var lngi = 0;
var address;
var bname;
// prettier-ignore

const fetchCheckoutSession = async ({ quantity, product }) => {
  return await fetch(
    "https://localmainstreetbackend.herokuapp.com/app/payment/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        product,
      }),
    }
  ).then((res) => res.json());
};

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

function reducer(state, action) {
  switch (action.type) {
    case "useEffectUpdate":
      return {
        ...state,
        ...action.payload,
        price: formatPrice({
          amount: action.payload.basePrice / 100,
          currency: action.payload.currency,
          quantity: state.quantity,
        }),
      };
    case "increment":
      return {
        ...state,
        quantity: state.quantity + 1,
        price: formatPrice({
          amount: state.basePrice / 100,
          currency: state.currency,
          quantity: state.quantity + 1,
        }),
      };
    case "decrement":
      return {
        ...state,
        quantity: state.quantity - 1,
        price: formatPrice({
          amount: state.basePrice / 100,
          currency: state.currency,
          quantity: state.quantity - 1,
        }),
      };
    case "setLoading":
      return { ...state, loading: action.payload.loading };
    case "setError":
      return { ...state, error: action.payload.error };
    default:
      throw new Error();
  }
}

function Map(props) {
  var [shop, setShop] = useState(null);
  console.log(props);

  if (props.lat && props.lng != undefined) {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: Number(props.lat), lng: Number(props.lng) }}
      >
        <Marker
          position={{
            lat: Number(props.lat),
            lng: Number(props.lng),
          }}
          onClick={() => {
            setShop(
              (shop = {
                lat: Number(props.lat),
                lng: Number(props.lng),
              })
            );
          }}
        />

        {shop && (
          <InfoWindow
            position={{
              lat: Number(props.lat),
              lng: Number(props.lng),
            }}
            onCloseClick={() => {
              setShop((shop = null));
            }}
          >
            <div
              style={{
                margin: "10px",
              }}
            >
              <h3>{bname}</h3>
              <h4>{address}</h4>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
        }}
      >
        <strong>Error - Map could not be loaded</strong>
      </div>
    );
  }
}

const MapWrapped = withGoogleMap(Map);

const Buy = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    quantity: 1,
    price: null,
    loading: false,
    error: null,
    stripe: null,
  });
  var lt, ln;
  (async () => {
    Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
    await Geocode.fromAddress(`${props.location.state.address}`).then(
      (response) => {
        lt = response.results[0].geometry.location.lat;
        ln = response.results[0].geometry.location.lng;
        console.log(lt, ln);
      },
      (error) => {
        console.error("ERfdsdsffsdROR", error);
      }
    );
  })();

  var [mprice, setMprice] = useState(0);
  var [modal, setModal] = useState("none");
  var [dprice, setDprice] = useState("");
  var [lat, setLat] = useState();
  var [lng, setLng] = useState();
  var [donate, setDonate] = useState(0);

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { publicKey, basePrice, currency } = await fetch(
        "https://localmainstreetbackend.herokuapp.com/app/payment/config"
      ).then((res) => res.json());
      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.
      dispatch({
        type: "useEffectUpdate",
        payload: { basePrice, currency, stripe: await loadStripe(publicKey) },
      });
    }
    fetchConfig();

    // async function geocode() {
    //   const options = {
    //     provider: "tomtom",
    //     // Optional depending on the providers
    //     apiKey: "1mFsoddRBssP98W4yadCzAdopJJXjuw0", // for Mapquest, OpenCage, Google Premier
    //     formatter: null, // 'gpx', 'string', ...
    //   };

    //   const geocoder = NodeGeocoder(options);

    //   const res = await geocoder.geocode("2 Darryl Dr");
    //   console.log("OHHIHI", res);
    // }
    // geocode();
    (async () => {
      try {
        address = props.location.state.address;
        bname = props.location.state.bname;
      } catch (error) {}

      try {
        console.log(props.location.state.address);
        if (props.location.state.address === undefined) {
          alert("Invalid address. Map could not be displayed");
        }

        Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
        try {
          var { lat } = "";
          var { lng } = "";
          try {
            await Geocode.fromAddress(`${props.location.state.address}`).then(
              (response) => {
                lat = response.results[0].geometry.location.lat;
                lng = response.results[0].geometry.location.lng;
                console.log("lat and lng", lat, lng);
                // prettier-ignore
                setLng((lng = lng));
                setLat((lat = lat));

                lati = lat;
                lngi = lng;
                console.log("gyfds", lat);
                console.log("Number", Number(lat));
              },
              (error) => {
                console.error("ERROR", error);
              }
            );
          } catch (error) {}

          // const script = document.createElement("script");
          // script.src = process.env.PUBLIC_URL + "/sdk/tomtom.min.js";
          // document.body.appendChild(script);
          // script.async = true;
          // script.onload = () => {
          //   var map = window.tomtom.L.map("map", {
          //     source: "vector",
          //     key: `${process.env.REACT_APP_TKEY}`,
          //     center: [lat, lng],
          //     basePath: "/sdk",
          //     zoom: 16,
          //   });
          // };
        } catch (error) {
          alert("Invalid address. Map could not be displayed");
        }
      } catch (err) {}
    })();
  }, []);

  var prop = props.location.state;

  // prettier-ignore

  async function handleToken(token, addresses) {
    const product = {
      name: "Donate to LocalMainStreet",
      price: dprice,
    };
    const response = await axios.post(
      "https://localmainstreetbackend.herokuapp.com/app/payment/checkout",
      {
        token,
        product,
      }
    );

    const { status } = response.data;
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });

      axios.post("https://localmainstreetbackend.herokuapp.com/app/payment/donate", {
        status: "yes"
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
      
      const fnameq = localStorage.getItem("fname");
      const lnameq = localStorage.getItem("lname");
      const emailq = localStorage.getItem("email");
      console.log({
        fnameq,
        lnameq,
        emailq
      })
  
      const payload = {
        nameq: `${fnameq} ${lnameq}`,
        emailq: emailq,
        balance: mprice,
      };
  
      await axios
        .post("https://localmainstreetbackend.herokuapp.com/app/payment/getInfo", payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  
      const id = {
        id: prop.id,
      };
  
      // await axios
      //   .post("https://localmainstreetbackend.herokuapp.com/app/payment/create-checkout-session", id)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
  
      // Call your backend to create the Checkout session.
      dispatch({ type: "setLoading", payload: { loading: true } });
      const { sessionId } = await fetchCheckoutSession({
        quantity: mprice,
        product: prop,
      });
      // When the customer clicks on the button, redirect them to Checkout.
      const { error } = await state.stripe.redirectToCheckout({
        sessionId,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
        dispatch({ type: "setError", payload: { error } });
        dispatch({ type: "setLoading", payload: { loading: false } });
      }
    
    } else {
      toast("Something went wrong.", { type: "error" });
    }
  }

  const handleClick = async (event) => {
    if (mprice === undefined) {
      alert("Please enter a price");
    } else if (mprice === "0") {
      alert("Please enter a price. It cannot be 0.");
    } else if (mprice === null) {
      alert("Please enter a price");
    } else if (mprice === "") {
      alert("Please enter a price");
    } else if (mprice > 999996) {
      alert("Price cannot go above $999,996");
    } else {
      if (mprice > 999999) {
        alert("Cannot go above 999,999 dollars.");
        state.loading = false;
      }
      var fnameq = localStorage.getItem("fname");
      var lnameq = localStorage.getItem("lname");
      var emailq = localStorage.getItem("email");

      const payload = {
        nameq: `${fnameq} ${lnameq}`,
        emailq: emailq,
        balance: mprice,
      };

      await axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/payment/getInfo",
          payload
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      const id = {
        id: prop.id,
      };

      await axios
        .post(
          "https://localmainstreetbackend.herokuapp.com/app/payment/donate",
          {
            regularPrice: Number(mprice),
            donation: donate,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // Call your backend to create the Checkout session.
      dispatch({ type: "setLoading", payload: { loading: true } });

      const { sessionId } = await fetchCheckoutSession({
        quantity: total,
        product: prop,
      });
      // When the customer clicks on the button, redirect them to Checkout.
      const { error } = await state.stripe.redirectToCheckout({
        sessionId,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
        dispatch({ type: "setError", payload: { error } });
        dispatch({ type: "setLoading", payload: { loading: false } });
      }
    }
  };

  //   pushShop = () => {
  //     this.props.history.push("/Shop");
  //   };

  var props = props;

  try {
    bc = prop.businessCatagory;
  } catch (err) {
    prop = {
      bname: "",
      description: "",
    };

    props.history.push("/Shop");
  }

  var image;
  if (bc === "Restaurant") {
    image = "resteraunt.png";
  } else if (bc === "Hair and Nail Salon") {
    image = "salon.png";
  } else if (bc === "Grocery") {
    image = "grocery.png";
  } else if (bc === "Auto") {
    image = "auto.png";
  } else if (bc === "Spa & Beauty") {
    image = "spa.jpg";
  } else if (bc === "Massage Parlour") {
    image = "massage.png";
  } else if (bc === "Recreation") {
    image = "recreation.png";
  } else if (bc === "Coffee & Bakery") {
    image = "coffee.png";
  } else {
    image = "defaulticon.png";
  }

  $(document).ready(function () {
    $(this).scrollTop(0);
  });
  const total = Number(mprice) + Number(donate);

  return (
    <div className="sr-root" id="Buy">
      <div className="sr-main">
        <section
          className="container1"
          style={{
            display: "flex",

            justifySelf: "center",

            alignSelf: "center",
          }}
        >
          <div>
            <h1 id="h1">{prop.bname}</h1>
            <h4 id="h4">{prop.description}</h4>
          </div>
          {/* <div className="quantity-setter">
            <button
              className="increment-btn"
              id="bbutton"
              disabled={state.quantity === 1}
              onClick={() => dispatch({ type: "decrement" })}
            >
              -
            </button>
            <input
              type="number"
              id="quantity-input"
              min="1"
              max="10"
              value={state.quantity}
              readOnly
            />
            <button
              className="increment-btn"
              id="bbutton"
              disabled={state.quantity === 10}
              onClick={() => dispatch({ type: "increment" })}
            >
              +
            </button>
          </div> */}
          <br></br>
          <p
            className="sr-legal-text"
            style={{
              marginBottom: "0",
            }}
          >
            <strong>Enter your amount</strong>
          </p>
          <div className="quantity-setter">
            <input
              type="number"
              numberFormat
              id="quantity-input"
              min="1"
              style={{
                width: "90%",
                borderRadius: "5px0",
              }}
              className="numberinput"
              max="100000000"
              value={mprice}
              onChange={(e) => {
                price: formatPrice({
                  amount: e.target.value,
                });
                setMprice((mprice = e.target.value));
              }}
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p className="sr-legal-text">
            <big>
              <strong>
                It costs us money to provide this service, and we do not charge
                you for it. Any donation is appreciated
              </strong>
            </big>
          </p>
          <div
            id="donate"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <input
              type="button"
              style={{
                margin: "0 5px",
              }}
              value="$1"
              className="1 donatebtns"
              onClick={() => {
                setDonate(1);
              }}
            />
            <input
              type="button"
              style={{
                margin: "0 5px",
              }}
              value="$2"
              className="2 donatebtns"
              onClick={() => {
                setDonate(2);
              }}
            />
            <input
              type="button"
              style={{
                margin: "0 5px",
              }}
              value="$5"
              className="5 donatebtns"
              onClick={() => {
                setDonate(5);
              }}
            />

            <label>&nbsp;Other</label>
            <input
              type="number"
              style={{
                margin: "0 5px",
                textAlign: "center",
              }}
              placeholder="Other"
              className="o donatebtns"
              // value={donate}
              onChange={(e) => {
                setDonate(Number(e.target.value));
              }}
            />
          </div>
          <p
            className="sr-legal-text"
            style={{
              marginBottom: "0",
            }}
          >
            <strong>Total: ${mprice / 1 + donate}</strong>
          </p>
          <button role="link" onClick={handleClick} id="bbutton">
            Buy{" "}
          </button>

          <div className="sr-field-error">{state.error?.message}</div>

          <h6
            style={{
              textAlign: "center",
            }}
          >
            Don't worry! Your information is secure and encrypted. We use
            Stripe, one of the leading brands in payment processing, to deliver
            a secure, safe, and smart way to handle payments.
          </h6>
          <h6
            style={{
              textAlign: "center",
            }}
          >
            Please note Stripe will have an additional service charge of 60
            cents added to your payment. We do not charge you anything for this
            service.
          </h6>
        </section>
        <br></br>
        <br></br>
      </div>
      {/* <div
        id="map2"
        style={{
          position: "absolute",
          width: "100vw",
          height: "50vh",
          top: "0",
          zIndex: 90,
        }}
      >
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GKEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          lat={lat}
          lng={lng}
        />
      </div> */}
    </div>
  );
};

export default Buy;
