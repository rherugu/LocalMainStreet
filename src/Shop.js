import React from "react";
import "./Shop.css";
import axios from "axios";
import Component from "@reactions/component";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import $ from "jquery";

class Shop extends Component {
  onClickHome = () => {
    this.props.history.push("/");
  };
  onClickShop = () => {
    this.props.history.push("/Shop");
  };
  onClickAbout = () => {
    this.props.history.push("/About");
  };
  onClickContact = () => {
    this.props.history.push("/Contact");
  };
  onClickLogin = () => {
    this.props.history.push("/login");
  };

  handleToken = async (token) => {
    console.log("hi");
    const product = {
      name: this.state.name,
      price: this.state.price,
    };
    const response = await axios.post("http://localhost:8080/", {
      token,
      product,
    });
    const { status } = response.data;
    console.log("#status", status);
    if (status === "success") {
      alert("Success! Check email for details");
    } else {
      alert("Something went wrong.");
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      price: 25,
      name: "SmartTicketing",
    };
  }

  componentDidMount() {
    const tokenval = localStorage.getItem("token");

    const headers = {
      "auth-token": tokenval,
    };
    axios
      .get("http://localhost:3000/shop", { headers })
      .then((response) => {
        console.log(response.data);

        this.setState({ shops: response.data });
      })
      .catch((err) => {
        this.onClickLogin();
      });
  }

  render() {
    return (
      <div className="Shop">
        <div className="Shop-headerP" style={{ backgroundColor: "#ffffff" }}>
          <div className="Shop-header">
            <div className="logoimg" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo.png")}
                className="logoimage"
              ></img>
            </div>

            <div className="tabs">
              <div className="navtabs" onClick={this.onClickHome}>
                <span id="btnspan">Home</span>
              </div>
              <br></br>
              <div className="navtabs" onClick={this.onClickShop}>
                <span id="btnspan">Shop</span>
              </div>
              <br></br>
              <div className="navtabs" onClick={this.onClickAbout}>
                <span id="btnspan">About</span>
              </div>
              <br></br>
              <div className="navtabs" onClick={this.onClickContact}>
                <span id="btnspan">Contact</span>
              </div>
              <br></br>
              <div className="divider"></div>

              <div
                className="navtabsL"
                id=".dropbtn"
                onClick={this.onClickLogin}
              >
                <span id="btnspan">Login</span>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <StripeCheckout
          stripeKey="pk_test_KkfXWjgjLwtNgUTOjtn25pj4005QCLSJ6I"
          token={this.handleToken}
          billingAddress
          shippingAddress
          amount={this.state.price * 100}
          name={this.state.name}
        ></StripeCheckout>

        <div class="searchBox">
          <input
            class="searchInput"
            type="text"
            name=""
            placeholder="Search"
          ></input>
          <button class="searchButton" href="#">
            <i class="material-icons">search</i>
          </button>
        </div>
      </div>
    );
  }
}

export default Shop;
