import React from "react";
import "./Shop.css";
import axios from "axios";
import Component from "@reactions/component";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import MediaCard from "./Card";

// const useStyles = makeStyles((theme) => ({
//   gridList: {
//     width: 500,
//     height: 450,
//   },
// }));

// const classes = useStyles();

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
    toast.configure();

    const product = {
      name: this.state.name,
      price: this.state.price,
    };
    const response = await axios.post("http://localhost:8080/checkout", {
      token,
      product,
    });
    const { status } = response.data;
    console.log("#status", status);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong.", { type: "error" });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      price: 25,
      name: "SmartTicketing",
    };
    this.bname = "";
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
    const shops = this.state.shops.map((shop) => shop);

    const phoneNumber = this.state.shops.map((shop) => {
      return <p key={shop._id}>{shop.phoneNumber}</p>;
    });

    const bname = this.state.shops.map((shop) => {
      return <p key={shop._id}>{shop.bname}</p>;
    });
    const description = this.state.shops.map((shop) => {
      return <p key={shop._id}>{shop.description}</p>;
    });

    var Infinite = require("react-infinite");

    return (
      <div className="Shop">
        <header className="Home-Header">
          <div className="HH">
            <div className="logoimg" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo.png")}
                className="logoimage"
                alt="localmainstreet"
              ></img>
            </div>
            <div className="logoimg2" onClick={this.onClickHome}>
              <img
                src={require("./Assets/logor.png")}
                className="logoimage2"
                alt="localmainstreet"
              ></img>
            </div>

            <h3 className="Hheading1" onClick={this.onClickHome}>
              <span>Home</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickShop}>
              <span>Shop</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickAbout}>
              <span>About</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickContact}>
              <span>Contact</span>
            </h3>
            <h3 className="Hheading2" onClick={this.onClickLogin}>
              <span>Login</span>
            </h3>
          </div>
        </header>
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

        {/* <ul>{bname}</ul>
        <ul>{description}</ul>
        <ul>{phoneNumber}</ul> */}
        <br></br>
        <br></br>
        <div className="gridlist">
          <div className="card">
            {shops.map((shop) => (
              <MediaCard
                card={shop}
                className="MediaCard"
                bname={shop.bname}
                description={shop.description}
                phoneNumber={shop.phoneNumber}
                history={this.props.history}
              />
            ))}
          </div>
        </div>
        <p className="end">It looks like you've reached the end.</p>
      </div>
    );
  }
}

export default Shop;
