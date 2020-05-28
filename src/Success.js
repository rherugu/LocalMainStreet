import React, { Component } from "react";
import axios from "axios";

var stripeAccountId = "";
var res = "";
var shops = "";
var database;

class Success extends Component {
  constructor(props) {
    super(props);
    this.shops = "";
  }

  async componentDidMount() {
    var tokenval = localStorage.getItem("token");

    if (tokenval === "undefined") {
      tokenval = localStorage.getItem("Btoken");
    }
    if (tokenval === "undefined") {
      alert("You need to login to complete registration.");
      this.props.history.push({
        pathname: "/Login",
        state: {
          SuccessJs: "yes",
        },
      });
    }
    console.info(tokenval);
    const headers = {
      "auth-token": tokenval,
    };

    await axios
      .get(
        "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
        { headers }
      )
      .then((response) => {
        console.log(response);
        this.shops = String(response.data[response.data.length - 1]._id);
        console.log("dfsijfsjddfjfk", this.shops);
      })
      .catch((err) => {
        console.error(err);
      });
    await axios
      .get(
        "https://localmainstreetbackend.herokuapp.com/app/payment/stripeAccountId"
      )
      .then((res) => {
        stripeAccountId = res.data;
        console.log(stripeAccountId);
      })
      .catch((err) => {
        console.error(err);
      });
    // axios
    //   .get(
    //     "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
    //     { headers }
    //   )
    //   .then((response) => {
    //     console.log(response.data);

    //     const data = response.data;
    //     database = data[data.length - 1];
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    database = {
      // ...database,
      stripeAccountId: stripeAccountId,
    };

    console.log(stripeAccountId);

    // const database = {
    //   stripeAccountId: stripeAccountId,
    // };
    // axios
    //   .post("https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop", database)
    //   .then((response) => {
    //     res = response.data;

    //     alert(res.message);

    //     if (res.check === 200) {
    //       // this.props.history.push("/Dashboard");
    //     }

    //     console.log("#", response);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

    console.log("#&#&#&#&#&", this.shops);

    axios
      .patch(
        `https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop/${this.shops}`,
        database
      )
      .then((response) => {
        res = response.data;

        alert(res.message);

        if (res.check === 200) {
          alert("Success!");
        }

        console.log("#", response);
      })
      .catch(function (err) {
        console.error(err);
      });

    // this.props.history.push({
    //   pathname: "/Dashboard",
    //   state: {
    //     // tour: "no",
    //     stripeAccountId: database.stripeAccountId,
    //   },
    // });
  }

  render() {
    return (
      <div
        className="Success"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Success!</h1>
        <h3>
          Right now we are proccessing your information. You may close this page
          and return to the home page.
        </h3>
      </div>
    );
  }
}

export default Success;
