import React from "react";

class Redirecting extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h1
            style={{
              maxWidth: "50%",
              fontSize: "50px",
              textAlign: "center",
            }}
          >
            Please wait while we redirect you to Stripe . . .
          </h1>
        </div>
      </div>
    );
  }
}

export default Redirecting;
