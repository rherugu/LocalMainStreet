// prettier-ignore

import React, { useEffect, useReducer, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Buy.css";
import axios from "axios";
import Geocode from "react-geocode";
import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require("intersection-observer");
const NodeGeocoder = require("node-geocoder");

var bc;
var lati = 0;
var lngi = 0;
var address;
var bname;
const qs = require("query-string");

const fetchCheckoutSession = async ({ quantity, product }) => {
  // const payload = {
  //   quantity,
  //   product,
  // };
  // const headers = {
  //   "Content-Type": "application/json",
  // };
  // return await axios.post(
  //   "https://localmainstreetbackend.herokuapp.com/app/payment/create-checkout-session",
  //   payload,
  //   headers
  // );
  return await axios({
    url:
      "https://localmainstreetbackend.herokuapp.com/app/payment/create-checkout-session",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    // withCredentials: true,
    data: JSON.stringify({
      quantity,
      product,
      emailbusiness2: this.props.location.state.email,
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // return await fetch(
  //   "https://localmainstreetbackend.herokuapp.com/app/payment/create-checkout-session",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       quantity,
  //       product,
  //     }),
  //   }
  // ).then((res) => res.json());
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
  console.log(typeof Intl.NumberFormat.prototype.formatToParts);
  console.log(typeof Intl.DateTimeFormat.prototype.formatToParts);
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
        price: {
          amount: action.payload.basePrice / 100,
          currency: action.payload.currency,
          quantity: state.quantity,
        },
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

  var [stripe, setStripe] = useState(null);
  var [mprice, setMprice] = useState(0);
  var [modal, setModal] = useState("none");
  var [dprice, setDprice] = useState("");
  var [lat, setLat] = useState();
  var [lng, setLng] = useState();
  var [donate, setDonate] = useState(0);
  var [tooMuch, setTooMuch] = useState("none");
  var [tooMuchMprice, setTooMuchMprice] = useState();
  var [buyBtn, setBuyBtn] = useState("Buy");
  var [green1, setGreen1] = useState();
  var [green2, setGreen2] = useState();
  var [green5, setGreen5] = useState();
  var prop = props.location.state;
  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      // const { publicKey, basePrice, currency } = await fetch(
      //   "https://localmainstreetbackend.herokuapp.com/app/payment/config"
      // ).then((res) => res.json());
      const { publicKey, basePrice, currency } = axios
        .get("https://localmainstreetbackend.herokuapp.com/app/payment/config")
        .then((res) => {
          console.log(res);
        });
      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.
      dispatch({
        type: "useEffectUpdate",
        payload: {
          basePrice,
          currency,
          stripe: await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY),
        },
      });
      setStripe(await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
    }
    fetchConfig();
    (() => {
      const tokenval = localStorage.getItem("token");

      const token = `${tokenval}`;

      if (
        token === "undefined" ||
        token === "" ||
        token === undefined ||
        token === null ||
        token === "null"
      ) {
        if (
          `${localStorage.getItem("type")}` === "loggedout" ||
          "null" ||
          null ||
          undefined ||
          "undefined"
        ) {
          props.history.push({
            pathname: "/Login",
            state: {
              buy: "yes",
              bname: prop.bname,
              description: prop.description,
              phoneNumber: prop.phoneNumber,
              businessCatagory: prop.businessCatagory,
              id: prop.id,
              address: prop.address,
              email: prop.emailb,
            },
          });
        }
      }
      setBuyBtn("Buy");
    })();
  }, []);

  const handleClick = async (event) => {
    if (mprice === undefined) {
      setBuyBtn("Please enter a price");
    } else if (mprice === 0) {
      setBuyBtn("Please enter a price");
    } else if (mprice === "0") {
      setBuyBtn("Please enter a price. It cannot be 0.");
    } else if (mprice === null) {
      setBuyBtn("Please enter a price");
    } else if (mprice === "") {
      setBuyBtn("Please enter a price");
    } else if (mprice > 999996) {
      setBuyBtn("Price cannot go above $999,996");
    } else {
      if (mprice > 999996) {
        state.loading = false;
        setBuyBtn("Cannot go above 999,996 dollars.");
      }
      setBuyBtn("Processing...");
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

      // const { sessionId } = await fetchCheckoutSession({
      //   quantity: mprice,
      //   product: prop,
      // });
      var sessionId;
      axios({
        url:
          "https://localmainstreetbackend.herokuapp.com/app/payment/create-checkout-session",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // withCredentials: true,
        data: JSON.stringify({
          quantity: mprice,
          product: prop,
          emailbusiness2: prop.email,
        }),
      })
        .then(async (res) => {
          console.log(res);
          sessionId = res.data.sessionId;
          console.log(stripe);
          var checkoutSession = await loadStripe(
            process.env.REACT_APP_STRIPE_PUBLIC_KEY
          );
          // When the customer clicks on the button, redirect them to Checkout.
          const { error } = await checkoutSession.redirectToCheckout({
            sessionId,
          });
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `error.message`.
          if (error) {
            dispatch({ type: "setError", payload: { error } });
            dispatch({ type: "setLoading", payload: { loading: false } });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  var props = props;

  try {
    bc = prop.bname;
  } catch (err) {
    const parsed = qs.parse(props.location.search);
    console.log(parsed.search);
    if (parsed !== undefined || null || NaN) {
      prop = {
        bname: parsed.bname,
        description: parsed.description,
        phoneNumber: parsed.phoneNumber,
        className: "Buy",
        id: parsed.stripeId,
        address: parsed.address,
        email: parsed.email,
      };
    }
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
            <h1
              style={{
                fontSize: "40px",
              }}
              id="h1"
            >
              {prop.bname}
            </h1>
            <p
              className="sr-legal-text"
              style={{
                textAlign: "left",
              }}
            >
              {prop.description}
            </p>
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
          <p
            className="sr-legal-text"
            style={{
              marginBottom: "0",
            }}
          >
            <big>
              <strong>Enter your amount</strong>
            </big>
          </p>
          <div className="quantity-setter">
            <input
              type="number"
              numberFormat
              id="quantity-input"
              min="1"
              style={{
                width: "90%",
                borderRadius: "5px",
              }}
              value={tooMuchMprice}
              className="numberinput"
              max="100000000"
              placeholder="0"
              onChange={(e) => {
                // formatPrice({
                //   amount: e.target.value,
                // });
                setMprice((mprice = e.target.value));
                if (mprice > 100) {
                  setTooMuch("block");
                }
                if (mprice < 100) {
                  setTooMuch("none");
                }
              }}
            />
          </div>
          <br></br>
          <br></br>

          {/* <p className="sr-legal-text">
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
                backgroundColor: green1,
              }}
              value="$1"
              className="1 donatebtns"
              onClick={() => {
                if (donate !== 1) {
                  setDonate(1);
                  setGreen1("#7FDBFF");
                  setGreen5();
                  setGreen2();
                } else if (donate === 1) {
                  setDonate(0);
                  setGreen1();
                }
              }}
            />
            <input
              type="button"
              style={{
                margin: "0 5px",
                backgroundColor: green2,
              }}
              value="$2"
              className="2 donatebtns"
              onClick={() => {
                if (donate !== 2) {
                  setDonate(2);
                  setGreen2("#7FDBFF");
                  setGreen1();
                  setGreen5();
                } else if (donate === 2) {
                  setDonate(0);
                  setGreen2();
                }
              }}
            />
            <input
              type="button"
              style={{
                margin: "0 5px",
                backgroundColor: green5,
              }}
              value="$5"
              className="5 donatebtns"
              onClick={() => {
                if (donate !== 5) {
                  setDonate(5);
                  setGreen5("#7FDBFF");
                  setGreen1();
                  setGreen2();
                } else if (donate === 5) {
                  setDonate(0);
                  setGreen5();
                }
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
                setGreen1();
                setGreen2();
                setGreen5();
              }}
            />
          </div> */}
          <p
            style={{
              marginBottom: "0",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            <strong>Total: ${mprice / 1 + donate}</strong>
          </p>

          <p
            style={{
              textAlign: "center",
            }}
            className="sr-legal-text"
          >
            We partner with Stripe for all payment processing. All your
            information is encrypted and secure. Please note Stripe will have an
            additional service charge of 2.9% + 30 cents added to your payment.
            We do not charge you anything for this service.
          </p>
          <button
            role="link"
            style={{
              fontSize: "20px",
            }}
            onClick={handleClick}
            id="bbutton"
          >
            {buyBtn}
          </button>
          <div
            style={{
              textAlign: "center",
              display: tooMuch,
            }}
          >
            <h3>
              You are purchasing an amount greater than 100. Are you sure?
            </h3>
            <input
              type="button"
              style={{
                marginBottom: "10px",
              }}
              onClick={() => {
                setTooMuch("none");
              }}
              value="Yes"
            ></input>

            <input
              type="button"
              value="No"
              onClick={() => {
                setTooMuch("none");
              }}
            ></input>
          </div>

          <div className="sr-field-error">{state.error?.message}</div>
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
