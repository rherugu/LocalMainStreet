import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";
import Component from "@reactions/component";
import "./Buy.css";
import Button from "@material-ui/core/Button";
import QRCode from "qrcode.react";
import { render } from "@testing-library/react";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function Buy(props) {
  var [price, setPrice] = useState();

  async function handleToken(token, addresses) {
    const product = {
      name: props.location.state.bname,
      price: price,
    };
    const response = await axios.post(
      "http://localhost:3006/app/payment/checkout",
      {
        token,
        product,
      }
    );
    const { status } = response.data;
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
      render(
        <div className="modal" id="modal">
          <button
            className="modalclose"
            onClick={() => {
              var x = document.getElementById("modal");
              x.style.opacity = 0;
            }}
          >
            close
          </button>
          <h3>This is your QRCode</h3>
          <QRCode value={product.price} />
        </div>
      );
    } else {
      toast("Something went wrong.", { type: "error" });
    }
  }

  var prop = props.location.state;
  var bc = prop.businessCatagory;

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
    <div className={prop.className} id="Buy">
      <img
        className="goback"
        id="back"
        src={require("./Assets/158817861253589426.png")}
        draggable="false"
      />
      <span
        className="goback"
        onClick={() => {
          props.history.push("/Shop");
        }}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back
      </span>
      <div className="section1">
        <img
          className="logoimgfordabuy"
          src={require(`./Assets/${image}`)}
          alt={prop.businessCatagory}
        />
        <div className="Title">
          <big>
            <h1>{prop.bname}</h1>
          </big>
        </div>
        <div className="Description">
          <big>
            <h2>{prop.description}</h2>
          </big>
        </div>
        <div className="PhoneNumber">
          <big>
            <p>Phone Number: {prop.phoneNumber}</p>
          </big>
        </div>
      </div>

      <div className="section2">
        <div className="purchase">
          {/* <h3 className="customval">Choose a custom price</h3> */}
          <input
            type="number"
            maxLength="6"
            minLength="1"
            min="1"
            max="6"
            onChange={(e) => setPrice((price = e.target.value))}
            value={price}
            placeholder="Choose a price"
            className="inputprice"
          ></input>
          <br></br>
          <div className="checkout">
            <StripeCheckout
              stripeKey="pk_test_KkfXWjgjLwtNgUTOjtn25pj4005QCLSJ6I"
              token={handleToken}
              billingAddress
              shippingAddress
              amount={price * 100 * 1.02}
              name={prop.bname}
            ></StripeCheckout>
          </div>
          <h6 className="note">
            Note: You will be charged 2% extra during this transaction for fees
            for LocalMainStreet. We do not store your credit card information.{" "}
          </h6>
          {/* <QRCode value="hi" /> */}
        </div>
      </div>
    </div>
  );
}
