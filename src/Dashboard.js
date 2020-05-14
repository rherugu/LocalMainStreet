import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";
import "./Dashboard.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = (props) => {
  var [price, setPrice] = useState();
  var [name, setName] = useState();

  var url = "";
  console.log(props);
  useEffect(async () => {
    await axios
      .post(
        "https://localmainstreetbackend.herokuapp.com/app/payment/dashboard",
        props.location.state
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("https://localmainstreetbackend.herokuapp.com/app/payment/dashboard")
      .then((res) => {
        url = res;
        document.location = res.data.url;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const handleClose3 = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const charming = require("charming");

  const d = 40;

  document.querySelectorAll(".rocket-button").forEach((elem) => {
    elem.querySelectorAll(".default, .success > div").forEach((text) => {
      charming(text);
      text.querySelectorAll("span").forEach((span, i) => {
        span.innerHTML = span.textContent == " " ? "&nbsp;" : span.textContent;
        span.style.setProperty("--d", i * d + "ms");
        span.style.setProperty(
          "--ds",
          text.querySelectorAll("span").length * d - d - i * d + "ms"
        );
      });
    });

    elem.addEventListener("click", (e) => {
      e.preventDefault();
      if (elem.classList.contains("animated")) {
        return;
      }
      elem.classList.add("animated");
      elem.classList.toggle("live");
      setTimeout(() => {
        elem.classList.remove("animated");
      }, 2400);
    });
  });

  // if (props.tour === "no") {
  //   var x = document.getElementById("welcome");
  //   x.style.display = "none";
  // }

  return (
    <div className="loadingbois">
      <h2>Loading...</h2>
      {/* <header className="Dashboard-Header">
        <div className="DH">
          <h3
            className="heading"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              props.history.push("/Dashboard");
            }}
          >
            <span>Dashboard</span>
          </h3>

          <h3 className="heading1">
            <span>Analytics</span>
          </h3>
          <h3 className="heading1">
            <span>Products</span>
          </h3>
          <h3 className="heading1">
            <span>Settings</span>
          </h3>
          <h3 className="heading2">
            <span>Logout</span>
          </h3>
          <div className="hamburger">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <img src={require("./Assets/hamburger.png")} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose1}>Analytics</MenuItem>
              <MenuItem onClick={handleClose2}>Settings</MenuItem>
              <MenuItem onClick={handleClose3}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </header>
      <main className="Dashboard">
        <div className="welcome" id="welcome">
          <h1 className="welcometxt">Welcome!</h1>

          <a href="" className="rocket-button">
            <div className="default">Take a Tour</div>
            <div className="success">
              <svg>
                <use xlinkHref="#check"></use>
              </svg>
              <div>Loaded</div>
            </div>
            <div className="animation">
              <div className="rocket">
                <svg>
                  <use xlinkHref="#rocket"></use>
                </svg>
              </div>
              <div className="smoke">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 11"
              id="check"
            >
              <polyline
                stroke="currentColor"
                points="1 5.5 5 9.5 12 1.5"
              ></polyline>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 36"
              id="rocket"
            >
              <path
                d="M12,0 C18.6666667,8.70175439 19.7777778,19.0350877 15.3333333,31 L8.66666667,31 C4.22222222,19.0350877 5.33333333,8.70175439 12,0 Z"
                fill="var(--rocket)"
              ></path>
              <path
                d="M12,0 C5.33333333,8.70175439 4.22222222,19.0350877 8.66666667,31 C6.72222222,17.9473684 7.83333333,7.61403509 12,0 Z"
                fill="var(--rocket-shadow-left)"
              ></path>
              <path
                d="M12,0 C18.6666667,8.70175439 19.7777778,19.0350877 15.3333333,31 C17.2777778,17.9473684 16.1666667,7.61403509 12,0 Z"
                fill="var(--rocket-shadow-right)"
              ></path>
              <path
                d="M22.2399372,27.25 C21.2403105,25.558628 19.4303122,23.808628 16.21,22 L15,31 L17.6512944,31 C18.2564684,31 18.8216022,31.042427 19.1572924,31.5292747 L21.7379379,35.271956 C22.0515593,35.7267976 22.5795404,36 23.1449294,36 C23.5649145,36 23.9142153,35.7073938 23.9866527,35.3215275 L24,35.146217 L23.9987214,35.1196135 C23.7534506,31.4421183 23.1671892,28.8189138 22.2399372,27.25 Z"
                fill="var(--rocket-wing-right)"
              ></path>
              <path
                d="M1.76006278,27.25 C2.75968951,25.558628 4.56968777,23.808628 7.79,22 L9,31 L6.34870559,31 C5.74353157,31 5.17839777,31.042427 4.84270762,31.5292747 L2.2620621,35.271956 C1.94844071,35.7267976 1.42045963,36 0.855070627,36 C0.435085457,36 0.0857846604,35.7073938 0.0133472633,35.3215275 L0,35.146217 L0.00127855763,35.1196135 C0.24654935,31.4421183 0.832810758,28.8189138 1.76006278,27.25 Z"
                fill="var(--rocket-wing-left)"
              ></path>
              <circle
                fill="var(--rocket-window-shadow)"
                cx="12"
                cy="12"
                r="3"
              ></circle>
              <circle
                fill="var(--rocket-window)"
                cx="12"
                cy="12"
                r="2.5"
              ></circle>
              <path
                d="M15.6021597,5.99977504 L8.39784027,5.99977504 C8.54788101,5.6643422 8.70496315,5.3309773 8.86908669,4.99968036 L15.1309133,4.99968036 C15.2950369,5.3309773 15.452119,5.6643422 15.6021597,5.99977504 Z"
                fill-opacity="0.3"
                fill="var(--rocket-line)"
              ></path>
            </symbol>
          </svg>
          <br></br>
          <a href="" className="rocket-button1">
            <div className="default1">No Thanks</div>
            <div className="success">
              <svg>
                <use xlinkHref="#check"></use>
              </svg>
              <div>No problem!</div>
            </div>
            <div className="animation">
              <div className="rocket">
                <svg>
                  <use xlinkHref="#rocket"></use>
                </svg>
              </div>
              <div className="smoke">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 11"
              id="check"
            >
              <polyline
                stroke="currentColor"
                points="1 5.5 5 9.5 12 1.5"
              ></polyline>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 36"
              id="rocket"
            >
              <path
                d="M12,0 C18.6666667,8.70175439 19.7777778,19.0350877 15.3333333,31 L8.66666667,31 C4.22222222,19.0350877 5.33333333,8.70175439 12,0 Z"
                fill="var(--rocket)"
              ></path>
              <path
                d="M12,0 C5.33333333,8.70175439 4.22222222,19.0350877 8.66666667,31 C6.72222222,17.9473684 7.83333333,7.61403509 12,0 Z"
                fill="var(--rocket-shadow-left)"
              ></path>
              <path
                d="M12,0 C18.6666667,8.70175439 19.7777778,19.0350877 15.3333333,31 C17.2777778,17.9473684 16.1666667,7.61403509 12,0 Z"
                fill="var(--rocket-shadow-right)"
              ></path>
              <path
                d="M22.2399372,27.25 C21.2403105,25.558628 19.4303122,23.808628 16.21,22 L15,31 L17.6512944,31 C18.2564684,31 18.8216022,31.042427 19.1572924,31.5292747 L21.7379379,35.271956 C22.0515593,35.7267976 22.5795404,36 23.1449294,36 C23.5649145,36 23.9142153,35.7073938 23.9866527,35.3215275 L24,35.146217 L23.9987214,35.1196135 C23.7534506,31.4421183 23.1671892,28.8189138 22.2399372,27.25 Z"
                fill="var(--rocket-wing-right)"
              ></path>
              <path
                d="M1.76006278,27.25 C2.75968951,25.558628 4.56968777,23.808628 7.79,22 L9,31 L6.34870559,31 C5.74353157,31 5.17839777,31.042427 4.84270762,31.5292747 L2.2620621,35.271956 C1.94844071,35.7267976 1.42045963,36 0.855070627,36 C0.435085457,36 0.0857846604,35.7073938 0.0133472633,35.3215275 L0,35.146217 L0.00127855763,35.1196135 C0.24654935,31.4421183 0.832810758,28.8189138 1.76006278,27.25 Z"
                fill="var(--rocket-wing-left)"
              ></path>
              <circle
                fill="var(--rocket-window-shadow)"
                cx="12"
                cy="12"
                r="3"
              ></circle>
              <circle
                fill="var(--rocket-window)"
                cx="12"
                cy="12"
                r="2.5"
              ></circle>
              <path
                d="M15.6021597,5.99977504 L8.39784027,5.99977504 C8.54788101,5.6643422 8.70496315,5.3309773 8.86908669,4.99968036 L15.1309133,4.99968036 C15.2950369,5.3309773 15.452119,5.6643422 15.6021597,5.99977504 Z"
                fill-opacity="0.3"
                fill="var(--rocket-line)"
              ></path>
            </symbol>
          </svg>
        </div>
      </main> */}
    </div>
  );
};

export default Dashboard;
