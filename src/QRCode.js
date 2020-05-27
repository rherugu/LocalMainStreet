import React from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import "./QRCode.css";

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
      name: "",
      emailf: "",
      refund: "block",
      message: "",
    };
  }

  async componentDidMount() {
    var canvas = document.getElementById("mycanvas");
    img = await canvas.toDataURL("image/png");

    this.setState({
      img: img,
    });

    localStorage.setItem("QRCodeUrl", img);
  }

  handleEmail = async () => {
    this.setState({
      display: "flex",
      sent: "Sending...",
    });
    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/getqrcode",
        { qrcode: img }
      )
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
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/sendqrcode",
        mail
      )
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
  handleWrongEmail = async (e) => {
    if (this.state.email === "" || null || undefined) {
      this.setState({
        display: "flex",
        sent: "Please enter an email.",
      });
      return 0;
    }
    this.setState({
      display: "flex",
      sent: "Sending...",
    });
    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/getqrcode",
        { qrcode: img }
      )
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
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/sendqrcode",
        mail
      )
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

  refund = async () => {
    await axios
      .get("https://localmainstreetbackend.herokuapp.com/app/payment/refund")
      .then((res) => {
        console.info(res);
      })
      .catch((err) => {
        console.error("refund err: ", err);
      });

    // var yourString = this.props.location.state.value.encData;
    // var result = yourString.substring(1, yourString.length - 1);
    await axios
      .delete(
        "https://localmainstreetbackend.herokuapp.com/app/qrcode/" +
          this.props.location.state.value._id
      )
      .then((res) => {
        console.log(res);
        this.setState({
          refund: "none",
        });
      })
      .catch((err) => {
        console.error("EROROOROROR", err);
      });

    localStorage.setItem("QRCode", undefined);

    this.props.history.push("/Shop");
  };

  share = async () => {
    if (this.state.emailf === "" || null || undefined) {
      this.setState({
        display: "flex",
        sent: "Please enter an email.",
      });
      return 0;
    }
    if (this.state.name === "" || null || undefined) {
      this.setState({
        display: "flex",
        sent: "Please enter an name.",
      });
    }
    if (this.state.message === "" || null || undefined) {
      this.setState({
        display: "flex",
        sent: "Please enter an message.",
      });
    }
    this.setState({
      display: "flex",
      sent: "Sending...",
    });
    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/getqrcode",
        { qrcode: img }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const mail = {
      emailq: this.state.emailf,
      name: this.state.name,
      bname: this.props.location.state.bname,
      message: this.state.message,
    };

    axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/sendqrcodeshare",
        mail
      )
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
          // style={{
          //   fontSize: "50px",
          // }}
          className="titleQR"
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
          // style={{
          //   width: "256px",
          //   height: "256px",
          // }}
          className="QRCode"
          src={this.state.img}
        ></img>

        <br></br>
        <h3 className="sendtxtext">
          Click the button below to send to {email}.
        </h3>
        <br></br>

        <br></br>
        <input
          type="button"
          className="sendbtnbutton"
          value="Send!"
          onClick={this.handleEmail}
          style={{
            width: "20%",
          }}
        ></input>
        <br></br>
        <h3 className="sendwrngwrong">{this.state.sent}</h3>
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
            type="email"
            placeholder="Enter right email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({
                email: e.target.value,
              });
            }}
            style={{
              width: "100%",
            }}
          ></input>

          <input
            style={{
              height: "44px",
              marginTop: "6.4px",
              marginLeft: "3px",
            }}
            onClick={this.handleWrongEmail}
            type="submit"
            value="Submit"
          ></input>
        </div>
        <br></br>

        <input
          type="button"
          className="sendbtnbutton"
          value="Refund this payment"
          onClick={this.refund}
          style={{
            width: "20%",
            display: this.state.refund,
          }}
        ></input>
        <br></br>
        <br></br>
        <label>Share with a friend!</label>
        <br></br>
        <input
          type="email"
          placeholder="Enter your friends email"
          value={this.state.emailf}
          onChange={(e) => {
            this.setState({
              emailf: e.target.value,
            });
          }}
          style={{
            width: "20%",
          }}
        ></input>
        <input
          type="text"
          placeholder="Enter your name"
          value={this.state.name}
          onChange={(e) => {
            this.setState({
              name: e.target.value,
            });
          }}
          style={{
            width: "20%",
          }}
        ></input>
        <input
          type="text"
          placeholder="Enter a message"
          value={this.state.message}
          onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}
          style={{
            width: "20%",
          }}
        ></input>
        <input
          type="button"
          className="sendbtnbutton"
          value="Send to friend!"
          onClick={this.share}
          style={{
            width: "20%",
          }}
        ></input>
      </div>
    );
  }
}

export default QRCodejs;
