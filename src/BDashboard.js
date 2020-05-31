import React from "react";
import axios from "axios";

class BDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
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
