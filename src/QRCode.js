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
      sendtheqrcodetotheemaildisplay: "none",
    };
  }

  async componentDidMount() {
    var canvas = document.getElementById("mycanvas");
    img = await canvas.toDataURL("image/png");

    this.setState({
      img: img,
    });

    localStorage.setItem("QRCodeUrl", img);
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
    var decryptedData, data;
    try {
      data = JSON.stringify(this.props.location.state.value.encData);
    } catch (error) {
      data = JSON.stringify(JSON.parse(localStorage.getItem("QRCode")).encData);
    }
    console.log(data);
    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/payment/decryption",
        {
          data: data,
        }
      )
      .then((res) => {
        console.log(res);
        decryptedData = res.data.decryptedData;
      })
      .catch((err) => {
        console.error(err);
      });
    const mail = {
      emailq: emaill,
      bname: this.props.location.state.bname,
      amount: decryptedData.balance,
    };

    axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/sendqrcode",
        mail
      )
      .then((res) => {
        console.log(res);
        this.setState({
          sent: `This gift has been sent to ${emaill}. Please check spam folder if needed.`,
        });
      })
      .catch((err) => {
        console.error("ERROR!!!", err);
      });
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
    var decryptedData, data;
    try {
      data = JSON.stringify(this.props.location.state.value.encData);
    } catch (error) {
      data = JSON.stringify(JSON.parse(localStorage.getItem("QRCode")).encData);
    }
    console.log(data);
    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/payment/decryption",
        {
          data: data,
        }
      )
      .then((res) => {
        console.log(res);
        decryptedData = res.data.decryptedData;
      })
      .catch((err) => {
        console.error(err);
      });
    const mail = {
      emailq: emaill,
      bname: this.props.location.state.bname,
      amount: decryptedData.balance,
    };

    axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/contact/sendqrcode",
        mail
      )
      .then((res) => {
        console.log(res);
        this.setState({
          sent: `Message sent successfully! Please check your email, ${emaill}`,
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

    var decryptedData, data;
    try {
      data = JSON.stringify(this.props.location.state.value.encData);
    } catch (error) {
      data = JSON.stringify(JSON.parse(localStorage.getItem("QRCode")).encData);
    }
    console.log(data);

    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/payment/decryption",
        {
          data: data,
        }
      )
      .then((res) => {
        console.log(res);
        decryptedData = res.data.decryptedData;
      })
      .catch((err) => {
        console.error(err);
      });

    const mail = {
      emailq: this.state.emailf,
      name: this.state.name,
      bname: this.props.location.state.bname,
      message: this.state.message,
      amount: decryptedData.balance,
    };
    console.log(mail.bname);

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

    var email;
    const tokenval = localStorage.getItem("token");
    const tokenvalB = localStorage.getItem("Btoken");

    var tokenC = `${tokenval}`;
    var tokenB = `${tokenvalB}`;

    if (tokenC === "undefined") {
      email = localStorage.getItem("emailb");
    } else if (tokenB === "undefined") {
      email = localStorage.getItem("email");
    }
    if (email === "undefined") {
      alert("You got logged out, you need to login to access this page");
      this.props.history.push({
        pathname: "/Login",
        state: {
          qrcode: "yes",
        },
      });
    }
    var valueL;
    var val;
    try {
      val = `${JSON.stringify(this.props.location.state.value)}`;
      valueL = localStorage.setItem("QRCode", val);
      console.log(valueL);
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
        className="QRCODE"
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
            includeMargin={true}
          ></QRCode>
        </div>
        <img alt="qr code bought" className="QRCode" src={this.state.img}></img>
        {/* <a href={this.state.img} download>
          <input
            type="button"
            style={{
              backgroundColor: "#FFDC00",
            }}
            value="Download Gift Card"
          ></input>
        </a> */}
        <br />

        <br></br>

        <div style={{ display: "flex" }} className="cardcontainer">
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            id="CardShareOrForMyself"
            className="CardShareOrForMyself1"
            onClick={this.handleEmail}
          >
            <img
              style={{ display: "flex", alignSelf: "center" }}
              src="https://img.icons8.com/fluent/200/000000/person-male.png"
            ></img>
            <h3 style={{ textAlign: "center" }}>Voucher For myself</h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            id="CardShareOrForMyself"
            onClick={() => {
              if (this.state.sendtheqrcodetotheemaildisplay === "none") {
                this.setState({
                  sendtheqrcodetotheemaildisplay: "flex",
                });
              } else if (this.state.sendtheqrcodetotheemaildisplay === "flex") {
                this.setState({
                  sendtheqrcodetotheemaildisplay: "none",
                });
              }
            }}
          >
            <img
              style={{ display: "flex", alignSelf: "center" }}
              src="https://img.icons8.com/bubbles/200/000000/friends--v4.png"
            ></img>
            <h3 style={{ textAlign: "center" }}>Gift For a friend</h3>
          </div>
        </div>
        {/* <h3 className="sendtxtext">
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
            width: "30%",
            backgroundColor: "#FFDC00",
          }}
        ></input> */}
        <br></br>
        <h3 className="sendwrngwrong">{this.state.sent}</h3>
        <br
          style={{
            display: this.state.display,
          }}
        ></br>
        <div
          style={{
            display: this.state.sendtheqrcodetotheemaildisplay,
            flexDirection: "column",
          }}
          className="CARDSHARBTN"
        >
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
              width: "100%",
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
              width: "100%",
            }}
          ></input>
          <textarea
            type="text"
            placeholder="Enter a message"
            value={this.state.message}
            onChange={(e) => {
              this.setState({
                message: e.target.value,
              });
            }}
            style={{
              width: "100%",
              height: "100px",
            }}
          ></textarea>
          <input
            type="button"
            className="sendbtnbutton"
            value="Send to friend!"
            onClick={this.share}
            style={{
              width: "100%",
              backgroundColor: "#FFDC00",
            }}
          ></input>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default QRCodejs;
