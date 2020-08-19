import React from "react";
import axios from "axios";
import "./CustomerDashboard.css";
import QRCode from "qrcode.react";

class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcodes: [],
      nobought: "none",
    };
  }

  componentDidMount() {
    var email = localStorage.getItem("email");

    axios
      .get(
        `https://localmainstreetbackend.herokuapp.com/app/qrcode/dashboardsearch?emailq=${email}`,
        {
          emailq: email,
        }
      )
      .then((res) => {
        // prettier-ignore
        if (res.data.length === 0 || res.data === undefined || res.data === null) {
          this.setState({
            nobought: "flex",
          });
        }
        // prettier-ignore-end
        console.log(res.data);
        this.setState({
          qrcodes: res.data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div className="CustomerDashboard">
        <h1>Customer Dashboard</h1>
        <p>
          <input
            type="button"
            value="Go Back"
            onClick={() => {
              this.props.history.push("/Shop");
            }}
            style={{
              width: "300px",
            }}
          ></input>
        </p>
        {this.state.qrcodes.map((qrcode) => (
          <div className="QRcodeCardwrap">
            <div className="QRcodeCard">
              <div className="side1">
                <h2>
                  Bought from: <big>{qrcode.businessName}</big>
                </h2>

                <br></br>
                <h3>Amount left: {qrcode.balance}</h3>
                <h3>Original price: {qrcode.originalBalance}</h3>
                <h4>
                  Bought on {qrcode.day}/{qrcode.month}/{qrcode.year}
                </h4>
              </div>
              <div className="side2">
                <QRCode
                  size={256}
                  fgColor={this.state.color}
                  draggable
                  value={JSON.stringify(qrcode)}
                  id="mycanvas"
                  includeMargin={true}
                  className="codeqr"
                ></QRCode>
              </div>
            </div>
            <br></br>
            <div className="divider"></div>
          </div>
        ))}
        <br></br>
        <h3
          style={{
            display: this.state.nobought,
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          You haven't bought any vouchers. Buy
          <a href="/Shop">&nbsp;here.</a>
        </h3>
      </div>
    );
  }
}

export default CustomerDashboard;
