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
        .
      </h3>
    </div>
  );
};

export default fourofour;
