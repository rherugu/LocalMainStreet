import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";
import Component from "@reactions/component";
import "./Buy.css";

toast.configure();

export default function Buy(props) {
  var [price, setPrice] = useState();

  async function handleToken(token, addresses) {
    const product = {
      name: props.location.state.bname,
      price: price,
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
    } else {
      toast("Something went wrong.", { type: "error" });
    }
  }

  var prop = props.location.state;

  return (
    <div className={prop.className} id="Buy">
      <span
        className="goback"
        onClick={() => {
          props.history.push("/Shop");
        }}
      >
        Back
      </span>
      <div className="section1">
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
            type="text"
            maxLength="5"
            minLength="1"
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
          <h6>
            Note: You will be charged 2% extra during this transaction for fees
            for LocalMainStreet. We do not store your credit card information.{" "}
          </h6>
        </div>
      </div>
    </div>
  );
}
