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
import Geocode from "react-geocode";
// import "../public/sdk/map.css";
const NodeGeocoder = require("node-geocoder");

var bc;

function Map() {
  // const [selectedPark, setSelectedPark] = useState(null);

  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       setSelectedPark(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.4211, lng: -75.6903 }}>
      {/* {parkData.features.map(park => ( */}
      <Marker
        // key={park.properties.PARK_ID}
        position={{
          lat: 45.4211,
          lng: -75.6903,
        }}
        // onClick={() => {
        //   setSelectedPark(park);
        // }}
        // icon={{
        //   url: `/skateboarding.svg`,
        //   scaledSize: new window.google.maps.Size(25, 25)
        // }}
      />
      {/* ))} */}

      {/* {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: 45.4211,
            lng: -75.6903
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )} */}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const fetchCheckoutSession = async ({ quantity, product }) => {
  return await fetch(
    "http://localhost:3006/app/payment/create-checkout-session",
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

const Buy = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    quantity: 1,
    price: null,
    loading: false,
    error: null,
    stripe: null,
  });

  var [mprice, setMprice] = useState();

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { publicKey, basePrice, currency } = await fetch(
        "http://localhost:3006/app/payment/config"
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
        if (props.location.state.address === undefined) {
          alert("Invalid address. Map could not be displayed");
        }

        Geocode.setApiKey(`${process.env.REACT_APP_GKEY}`);
        try {
          var { lat } = "";
          var { lng } = "";

          await Geocode.fromAddress(`${props.location.state.address}`).then(
            (response) => {
              lat = response.results[0].geometry.location.lat;
              lng = response.results[0].geometry.location.lng;
              console.log("lat and lng", lat, lng);
            },
            (error) => {
              console.error("ERROR", error);
            }
          );

          const script = document.createElement("script");
          script.src = process.env.PUBLIC_URL + "/sdk/tomtom.min.js";
          document.body.appendChild(script);
          script.async = true;
          script.onload = () => {
            var map = window.tomtom.L.map("map", {
              source: "vector",
              key: `${process.env.REACT_APP_TKEY}`,
              center: [lat, lng],
              basePath: "/sdk",
              zoom: 16,
            });
          };
        } catch (error) {
          alert("Invalid address. Map could not be displayed");
        }
      } catch (err) {}
    })();
  }, []);

  var prop = props.location.state;

  const handleClick = async (event) => {
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
      .post("http://localhost:3006/app/payment/getInfo", payload)
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
    //   .post("http://localhost:3006/app/payment/create-checkout-session", id)
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

  return (
    <div className="sr-root">
      <div className="sr-main">
        <section className="container1">
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
          <div className="quantity-setter">
            <input
              type="number"
              numberFormat
              id="quantity-input"
              min="1"
              style={{
                width: "90%",
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
          <p className="sr-legal-text">Choose your price</p>
          <button role="link" onClick={handleClick} id="bbutton">
            Buy for ${mprice}
          </button>
          <div className="sr-field-error">{state.error?.message}</div>
        </section>
      </div>
      <div
        id="map"
        style={{
          position: "absolute",
          width: "100vw",
          height: "50vh",
          top: "0",
          zIndex: 90,
        }}
      ></div>
    </div>
  );
};

export default Buy;
