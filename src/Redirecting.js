import React from "react";

class Redirecting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  onClickEventHandler = () => {
    try {
      window.location.assign(this.props.location.state.stripeUrl);
    } catch (error) {
      this.setState({
        error: "Error, no stripe url recieved in the requested source.",
      });
    }
  };

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
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              maxWidth: "50%",
              textAlign: "center",
            }}
          >
            <big>Registration Successful at LocalMainStreet!</big>
          </h1>
          <br></br>
          <h1
            style={{
              maxWidth: "50%",
              textAlign: "center",
            }}
          >
            Click Next to setup your financial information for payments.{" "}
            <br></br>
            <small>
              (We partner with Stripe for payments. We do not store any of your
              information)
            </small>
          </h1>
          <br></br>
          <input
            type="button"
            value="Next"
            style={{
              width: "30%",
              backgroundColor: "green",
              color: "white",
              fontSize: "20px",
            }}
            onClick={this.onClickEventHandler}
          />

          <h4
            style={{
              textAlign: "center",

              width: "fit-content",
            }}
          >
            Please note that the first payout you<br></br> recieve will take up
            to <strong>5 to 7</strong> business days.
          </h4>

          <h4
            style={{
              textAlign: "center",
              color: "red",
              width: "fit-content",
            }}
          >
            {this.state.error}
          </h4>
        </div>
      </div>
    );
  }
}

export default Redirecting;
