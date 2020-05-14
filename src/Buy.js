import React, { useEffect, useReducer, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Buy.css";
import axios from "axios";

var bc;

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
  }, []);

  var prop = props.location.state;

  const handleClick = async (event) => {
    if (mprice > 999999) {
      alert("Cannot go above 999,999 dollars.");
      state.loading = false;
    }

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
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <section className="container1">
          <div>
            <h1 id="h1">{prop.bname}</h1>
            <h4 id="h4">{prop.description}</h4>
            <div className="pasha-image">
              <img
                alt="Help local businesses"
                src={require(`./Assets/${image}`)}
                width="140"
                height="160"
              />
            </div>
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
    </div>
  );
};

export default Buy;
