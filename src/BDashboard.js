import React from "react";
import axios from "axios";

class BDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      continueRegistering: "",
      buttonBelow: "none",
      emailb: "",
      fnameb: "",
      lnameb: "",
      bname: "",
      description: "",
      address: "",
      phoneNumber: "",
    };
  }
  componentDidMount() {
    const tokenval = localStorage.getItem("token");
    const tokenvalB = localStorage.getItem("Btoken");
    console.log(tokenval);
    const headers = {
      "auth-token": tokenval,
    };
    axios
      .get(
        "http://localhost:3003/app/BusinessLoginAPI/shop/" +
          localStorage.getItem("emailb"),
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        var d = res.data;
        this.setState({
          emailb: d.emailb,
          fnameb: d.fnameb,
          lnameb: d.lnameb,
          bname: d.bname,
          description: d.description,
          address: d.address,
          phoneNumber: d.phoneNumber,
        });
        if (d.stripeAccountId === "temporary") {
          this.setState({
            continueRegistering:
              "You have not completed your registration. Please click the button below to continue.",
            buttonBelow: "flex",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
          <input
            style={{
              maxWidth: "60%",
              textAlign: "center",
              height: "100px",
              fontSize: "30px",
            }}
            className="Bdash"
            type="button"
            value="Click to go to your dashboard"
            onClick={async () => {
              await axios
                .post(
                  "https://localmainstreetbackend.herokuapp.com/app/payment/dashboard",
                  this.props.location.state
                )
                .then((res) => {
                  console.log(res);

                  if (res.data === "temporary") {
                    alert(
                      "We have noticed some unusual traffic coming from your network. To secure your account, you need to login again. We are sorry for any inconvenience caused."
                    );
                    this.props.history.push({
                      pathname: "/Login",
                      state: {
                        error: "yes",
                      },
                    });
                  }
                })
                .catch((err) => {
                  console.error(err);
                });

              await axios
                .get(
                  "https://localmainstreetbackend.herokuapp.com/app/payment/dashboard"
                )
                .then((res) => {
                  document.location = res.data.url;
                })
                .catch((err) => {
                  console.error(err);

                  this.setState({
                    error:
                      "Error: This account was registered in test mode, and it cannot be accessed in live mode.",
                  });
                });
            }}
          />
          <h3 style={{ color: "red" }}>{this.state.error}</h3>
          <h3 style={{ color: "red" }}>{this.state.continueRegistering}</h3>
          <input
            type="button"
            value="Click to continue"
            style={{
              maxWidth: "60%",
              textAlign: "center",
              height: "100px",
              fontSize: "30px",
              textAlign: "center",
              display: this.state.buttonBelow,
            }}
            onClick={async () => {
              const data = {
                email: this.state.emailb,
                fname: this.state.fnameb,
                lname: this.state.lnameb,
                bname: this.state.bname,
                description: this.state.description,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
              };

              await axios
                .post(
                  "https://localmainstreetbackend.herokuapp.com/app/payment/data",
                  {
                    data,
                  }
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log("ERROR", err);
                });
              await axios
                .get(
                  "https://localmainstreetbackend.herokuapp.com/app/payment/get-oauth-link",
                  {
                    "Content-Type": "application/json",
                  }
                )
                .then(async (res) => {
                  console.log(res);
                  if (res.data.url) {
                    var stripeUrl = res.data.url;
                    window.location.assign(stripeUrl);
                  } else {
                    alert("Something went wrong. We are sorry.");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          ></input>
          <br></br>
          <input
            style={{
              maxWidth: "60%",
              textAlign: "center",
              height: "100px",
              fontSize: "30px",
            }}
            className="Bdash"
            type="button"
            value="Click to go Home"
            onClick={() => {
              window.location.assign("/home");
            }}
          />
        </div>
      </div>
    );
  }
}

export default BDashboard;
