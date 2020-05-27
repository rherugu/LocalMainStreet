import React from "react";
import { Link } from "react-router-dom";

const fourofour = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1>Whoops, it looks like you broke the internet.</h1>
      <h3>
        Just kidding. But it seems like this page is not found. Try going back
        to{" "}
        <Link className="link" to="/">
          home
        </Link>
        . Or click on the links below:
      </h3>
      <br></br>
      <ul>
        <li
          style={{
            textAlign: "left",
          }}
        >
          <Link
            className="link"
            style={{
              textAlign: "left",
              justifyContent: "start",
            }}
            to="/Shop"
          >
            Shop
          </Link>
        </li>
        <li
          style={{
            textAlign: "left",
          }}
        >
          <Link
            className="link"
            style={{
              textAlign: "left",
              justifyContent: "start",
            }}
            to="/About"
          >
            About Us
          </Link>
        </li>
        <li
          style={{
            textAlign: "left",
          }}
        >
          <Link
            className="link"
            style={{
              textAlign: "left",
              justifyContent: "start",
            }}
            to="/Contact"
          >
            Contact Us
          </Link>
        </li>
        <li
          style={{
            textAlign: "left",
          }}
        >
          <Link
            className="link"
            style={{
              textAlign: "left",
              justifyContent: "start",
            }}
            to="/Login"
          >
            Login to your account
          </Link>
        </li>
        <li
          style={{
            textAlign: "left",
          }}
        >
          <Link
            className="link"
            style={{
              textAlign: "left",
              justifyContent: "start",
            }}
            to="/CustomerLogin"
          >
            Register an account
          </Link>
        </li>
        <li
          style={{
            textAlign: "left",
          }}
        >
          <Link
            className="link"
            style={{
              textAlign: "left",
              justifyContent: "start",
            }}
            to="/BusinessLogin"
          >
            Register a business
          </Link>
        </li>
      </ul>

      <h4
        style={{
          position: "absolute",
          bottom: "30px",
          transform: "translate(-50%)",
          left: "50%",
        }}
      >
        404 Error
      </h4>
    </div>
  );
};

export default fourofour;
