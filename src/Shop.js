import React from "react";
import "./Shop.css";
import axios from "axios";
import Component from "@reactions/component";
import { toast } from "react-toastify";
import MediaCard from "./Card";
import Loader from "./Loader";
import { trackPromise } from "react-promise-tracker";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
// import { Dropdown } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";

// const options = [
//   {
//     key: 0,
//     value: "Restaurant",
//     text: "Restaurant",
//   },
//   {
//     key: 1,
//     value: "Hair and Nail Salon",
//     text: "Hair and Nail Salon",
//   },
//   {
//     key: 2,
//     value: "Grocery",
//     text: "Grocery",
//   },
//   {
//     key: 3,
//     value: "Auto",
//     text: "Auto",
//   },
//   {
//     key: 4,
//     value: "Spa & Beauty",
//     text: "Spa & Beauty",
//   },
//   {
//     key: 5,
//     value: "Massage Parlour",
//     text: "Massage Parlour",
//   },
//   {
//     key: 6,
//     value: "Recreation",
//     text: "Recreation",
//   },
//   {
//     key: 7,
//     value: "Coffee & Bakery",
//     text: "Coffee & Bakery",
//   },
//   {
//     key: 8,
//     value: "Others",
//     text: "Others",
//   },
// ];

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

  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      price: 25,
      name: "SmartTicketing",
      businessCatagory: "",
    };
    this.bname = "";
  }

  componentDidMount() {
    const tokenval = localStorage.getItem("token");

    const headers = {
      "auth-token": tokenval,
    };
    trackPromise(
      axios
        .get(
          "https://localmainstreetbackend.herokuapp.com/app/BusinessLoginAPI/shop",
          { headers }
        )
        .then((response) => {
          console.log(response.data);

          this.setState({ shops: response.data });
        })
        .catch((err) => {
          this.onClickLogin();
        })
    );
  }

  optionChange = (e) => {
    this.setState({ businessCatagory: e.target.value });
  };

  handleOpen = () => {
    this.setState({
      open: "true",
    });
  };
  handleClose = () => {
    this.setState({
      open: "false",
    });
  };

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
        <Loader />

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
        <select
          value={this.state.businessCatagory}
          onChange={this.optionChange}
          className="filter"
        >
          <option>Restaurant</option>
          <option>Hair and Nail Salon</option>
          <option>Grocery</option>
          <option>Auto</option>
          <option>Spa & Beauty</option>
          <option>Massage Parlour</option>
          <option>Recreation</option>
          <option>Coffee & Bakery</option>
          <option>Others</option>
        </select>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
                businessCatagory={shop.businessCatagory}
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
