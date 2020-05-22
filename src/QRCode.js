import React from "react";
import QRCode from "qrcode.react";
import axios from "axios";

var img;

class QRCodejs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#111111",
      img: img,
      phone: "",
      sent: "",
      display: "none",
      wrongEmail: "none",
      wrongEmailTxt: "Wrong Email?",
      email: "",
    };
  }

  async componentDidMount() {
    var canvas = document.getElementById("mycanvas");
    img = await canvas.toDataURL("image/png");

    this.setState({
      img: img,
    });
  }

  handleEmail = async () => {
    this.setState({
      display: "flex",
      sent: "Sending...",
    });
    await axios
      .post("http://localhost:3003/app/contact/getqrcode", { qrcode: img })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const emaill = localStorage.getItem("email");

    const mail = {
      emailq: emaill,
    };

    axios
      .post("http://localhost:3003/app/contact/sendqrcode", mail)
      .then((res) => {
        console.log(res);
        this.setState({
          sent: "Message sent successfully!",
        });
      })
      .catch((err) => {
        console.error("ERROR!!!", err);
      });
  };
  handleWrongEmail = async () => {
    this.setState({
      display: "flex",
      sent: "Sending...",
    });
    await axios
      .post("http://localhost:3003/app/contact/getqrcode", { qrcode: img })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const mail = {
      emailq: this.state.email,
    };

    axios
      .post("http://localhost:3003/app/contact/sendqrcode", mail)
      .then((res) => {
        console.log(res);
        this.setState({
          sent: "Message sent successfully!",
        });
      })
      .catch((err) => {
        console.error("ERROR!!!", err);
      });
  };

  phone = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `https://api.imgbb.com/1/upload?key=6c7cb3d1ebc4d32ccee0110a8dbc2f68&image=${this.state.img}`,
        {
          image: this.state.img,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:3003/app/contact/phone", {
        phone: this.state.phone,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    // window.onload = async () => {
    // var canvas = document.getElementById("mycanvas");
    // img = await canvas.toDataURL("image/png");
    // };

    const email = localStorage.getItem("email");
    var valueL;
    var val;
    try {
      val = `${JSON.stringify(this.props.location.state.value)}`;
      valueL = localStorage.setItem("QRCode", val);
    } catch (error) {
      val = localStorage.getItem("QRCode");
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
          }}
        >
          Here is your QR code:{" "}
        </h1>
        <div
          style={{
            display: "none",
          }}
        >
          <QRCode
            size={256}
            fgColor={this.state.color}
            draggable
            value={val}
            id="mycanvas"
          ></QRCode>
        </div>
        <img
          style={{
            width: "256px",
            height: "256px",
          }}
          src={this.state.img}
        ></img>

        <br></br>
        <h3>Click the button below to send to {email}.</h3>
        <br></br>
        <input type="button" value="Send!" onClick={this.handleEmail}></input>
        <br></br>
        <h3>{this.state.sent}</h3>
        <br
          style={{
            display: this.state.display,
          }}
        ></br>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            if (this.state.wrongEmail === "none") {
              this.setState({
                wrongEmail: "flex",
                wrongEmailTxt: "Hide text input",
              });
            }
            if (this.state.wrongEmail === "flex") {
              this.setState({
                wrongEmail: "none",
                wrongEmailTxt: "Wrong Email?",
              });
            }
          }}
          className="link"
        >
          {this.state.wrongEmailTxt}
        </a>

        <br></br>
        <div
          style={{
            display: this.state.wrongEmail,
          }}
        >
          <input
            type="text"
            placeholder="Enter right email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({
                email: e.target.value,
              });
            }}
          ></input>

          <input
            style={{
              height: "44px",
              marginTop: "6.4px",
              marginLeft: "3px",
            }}
            onClick={this.handleWrongEmail}
            type="button"
            value="Submit"
          ></input>
        </div>
        <br></br>

        {/* <h3>You can also send using SMS: </h3>
        <input
          type="number"
          placeholder="Enter phone number"
          style={{
            width: "20%",
          }}
          value={this.state.phone}
          onChange={(e) => {
            this.setState({
              phone: e.target.value,
            });
          }}
        ></input>

        <input type="button" value="Send!" onClick={this.phone}></input> */}
      </div>
    );
  }
}

export default QRCodejs;
