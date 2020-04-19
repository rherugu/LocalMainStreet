import React from "react";
import axios from "axios";
import Component from "@reactions/component";
import "./BusinessLogin.css";
import "react-tabs/style/react-tabs.css";
import "react-awesome-button/dist/styles.css";

var res = "f";

class BusinessLogin extends Component {
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
  onClickCustomerLogin = () => {
    this.props.history.push("/CustomerLogin");
  };
  onClickBR2 = () => {
    this.props.history.push("/BR2");
  };

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      bname: "",
      description: "",
      Address: "",
      mailSent: false,
      error: null,
      PhoneNumber: "",
      displaymessage: "hidden",
      Password: "",
      paymentMethod: "",
    };
  }

  onSubmitEventHandler = (e) => {
    e.preventDefault();
    const payload = {
      emailb: this.state.email,
      passwordb: this.state.Password,
      fnameb: this.state.fname,
      lnameb: this.state.lname,
      bname: this.state.bname,
      description: this.state.description,
      address: this.state.Address,
      phoneNumber: this.state.PhoneNumber,
      paymentMethod: this.state.paymentMethod,
    };

    axios
      .post("http://localhost:3000/shop/", payload)
      .then((response) => {
        res = response.data;

        alert(res.message);

        if (res.check === 200) {
          this.props.history.push("/Dashboard");
        }

        console.log("#", response);
      })
      .catch(function (err) {
        console.log(err);
      });
    this.state.displaymessage = "visible";
  };

  render() {
    return (
      <div className="BLogin">
        {/* <header className="BLogin-header"> */}
        <div className="titleB">
          <h3 style={{ color: "#111111" }}>Business Registration</h3>
        </div>

        {/* </header> */}

        <big>
          <big>
            <h1 style={{ color: "#111111" }}>What's your name?</h1>
          </big>
        </big>

        <br></br>
        {/* separator */}
        {/* <div class="separator">
          <svg
            class="separator__svg"
            width="100%"
            height="400"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="#44A36F"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 100 100 V 10 L 0 100" />
            <path d="M 30 73 L 100 18 V 10 Z" fill="#308355" stroke-width="0" />
          </svg>
        </div> */}
        {/* end-separator */}

        <br></br>
        <form>
          <label style={{ color: "#111111" }}>First Name</label>
          <br></br>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={this.state.fname}
            onChange={(e) => this.setState({ fname: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>
          <label style={{ color: "#111111" }}>Last Name</label>
          <br></br>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={this.state.lname}
            onChange={(e) => this.setState({ lname: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>

          <label style={{ color: "#111111" }}>Email</label>
          <br></br>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>

          <label style={{ color: "#111111" }}>Password</label>
          <br></br>
          <input
            type="text"
            id="Password"
            name="Password"
            placeholder="Your Password"
            value={this.state.Password}
            onChange={(e) => this.setState({ Password: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>
          <label style={{ color: "#111111" }}>Business Name</label>
          <br></br>
          <input
            type="text"
            id="bname"
            name="bname"
            placeholder="The name of your business"
            value={this.state.bname}
            onChange={(e) => this.setState({ bname: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>

          <label style={{ color: "#111111" }}>
            Say something about your business
          </label>
          <br></br>
          <textarea
            rows="16"
            cols="160"
            id="description"
            name="description"
            placeholder="This will be shown for the consumer to see"
            onChange={(e) => this.setState({ description: e.target.value })}
            value={this.state.description}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          ></textarea>
          <br></br>

          <label style={{ color: "#111111" }}>Address</label>
          <br></br>
          <input
            type="text"
            id="Address"
            name="Address"
            placeholder="Your address"
            value={this.state.Address}
            onChange={(e) => this.setState({ Address: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>
          <label style={{ color: "#111111" }}>Phone Number</label>
          <br></br>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            placeholder="Your Phone No."
            value={this.state.PhoneNumber}
            onChange={(e) => this.setState({ PhoneNumber: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>
          <label style={{ color: "#111111" }}>Choose payment system</label>
          <br></br>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            placeholder="Choose payment system"
            value={this.state.paymentMethod}
            onChange={(e) => this.setState({ paymentMethod: e.target.value })}
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD",
            }}
          />
          <br></br>
          {/* <select
            id="paymentsystem"
            style={{
              width: 500,
              height: 50,
              fontSize: 20,
              backgroundColor: "#DDDDDD"
            }}
            value={this.state.paymentMethod}
            onChange={e => this.setState({ paymentMethod: e.target.value })}
          >
            <option value="Credit Card/Debit Card">
              Credit Card/Debit Card
            </option>
            <option value="Google Pay">Google Pay</option>
            <option value="Samsung Pay">Samsung Pay</option>
            <option value="Apple Pay">Apple Pay</option>
            <option value="Paypal">Paypal</option>
          </select>

          <br></br> */}
          <input
            type="submit"
            value="Submit"
            onClick={(e) => this.onSubmitEventHandler(e)}
          />
          <button onClick={() => this.props.history.push("/Subscription")}>
            Test
          </button>
        </form>
        <br></br>
        {/* <label style={{ color: "#111111" }}>First Name</label>
        <br></br>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your name…"
          value={this.state.fname}
          onChange={e => this.setState({ fname: e.target.value })}
          style={{
            width: 500,
            height: 50,
            fontSize: 20,
            backgroundColor: "#DDDDDD"
          }}
        />
        <br></br>
        <label style={{ color: "#111111" }}>Last Name</label>
        <br></br>
        <input
          type="text"
          id="lname"
          name="lastname"
          placeholder="Your last name…"
          value={this.state.lname}
          onChange={e => this.setState({ lname: e.target.value })}
          style={{
            width: 500,
            height: 50,
            fontSize: 20,
            backgroundColor: "#DDDDDD"
          }}
        /> */}
        <br></br>
        <button className="btn" onClick={this.onClickBR2}>
          <span>Great! Onto the next step!</span>
        </button>
        <button className="btn" onClick={this.onClickHome}>
          <span>Go Back to Home Page</span>
        </button>
      </div>
    );
  }
}

export default BusinessLogin;
