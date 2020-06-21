import React from "react";

class GetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      burger: "0",
      pointerEvents: "none",
      width: "30px",
      logout: "none",
      login: "flex",
      dashboardoftheB: "none",
    };
  }
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
  onClickLogout = () => {
    localStorage.setItem("token", undefined);
    localStorage.setItem("Btoken", undefined);
    this.props.history.push("/login");
  };
  componentDidMount() {
    const tokenval = localStorage.getItem("token");
    const tokenvalB = localStorage.getItem("Btoken");

    var tokenC = `${tokenval}`;
    var tokenB = `${tokenvalB}`;
    if (!localStorage.getItem("visted")) {
      this.setState({
        login: "flex",
        logout: "none",
      });
      localStorage.setItem("visted", true);
    }
    if (tokenB && tokenC === "undefined") {
      if (this.state.login === "none") {
        this.setState({
          login: "flex",
          logout: "none",
        });
      }
    } else if (tokenB || tokenC !== "undefined") {
      if (this.state.login === "flex") {
        this.setState({
          login: "none",
          logout: "flex",
        });
      }
    }
    if (localStorage.getItem("type") === "business") {
      this.setState({ dashboardoftheB: "flex" });
    } else {
      this.setState({ dashboardoftheB: "none" });
    }
  }
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="burger1"
          style={{
            height: "100%",
            opacity: this.state.burger,
            pointerEvents: this.state.pointerEvents,
            position: "fixed",
          }}
        >
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickHome}
          >
            <span>Home</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickShop}
          >
            <span>Shop</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickAbout}
          >
            <span>About</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickContact}
          >
            <span>Contact</span>
          </h3>
          <a href="/BDashboard">
            <span
              className="Hheading1b"
              style={{ display: this.state.dashboardoftheB }}
            >
              <span>Dashboard</span>
            </span>
          </a>
          <h3
            className="Hheading2b"
            style={{ fontSize: "20px", display: this.state.login }}
            onClick={this.onClickLogin}
          >
            <span>Login</span>
          </h3>
          <h3
            className="Hheading2b"
            style={{ fontSize: "20px", display: this.state.logout }}
            onClick={this.onClickLogout}
          >
            <span>Logout</span>
          </h3>
        </div>

        <header className="Home-Header">
          <div className="HH">
            <div className="logoimg" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo2.png")}
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

            <div
              className="burgermenu"
              style={{
                zIndex: "493324",
              }}
              onClick={() => {
                this.setState({
                  burger: "1",
                  width: "30px",
                  pointerEvents: "all",
                });
                if (this.state.burger === "1") {
                  this.setState({
                    burger: "0",
                  });
                }
                if (this.state.pointerEvents === "all") {
                  this.setState({
                    pointerEvents: "none",
                  });
                }
              }}
            >
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
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
            <h3
              className="Hheading2"
              style={{ display: this.state.login }}
              onClick={this.onClickLogin}
            >
              <span>Login</span>
            </h3>
            <h3 className="Hheading2" style={{ display: this.state.logout }}>
              <a href="/BDashboard">
                <span
                  className="Hheading1"
                  style={{ display: this.state.dashboardoftheB }}
                >
                  <span>Dashboard</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </a>
              <span onClick={this.onClickLogout}>Logout</span>
            </h3>
          </div>
        </header>
        <main
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            justifySelf: "center",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            verticalAlign: "center",
            // height: "100%",
            // width: "100%",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Register Here!
          </h1>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              margin: "auto",
            }}
          >
            <div
              className="buttonb"
              onClick={() => {
                this.props.history.push("/BusinessLogin");
              }}
            >
              <svg>
                <polyline
                  className="o1"
                  points="0 0, 150 0, 150 55, 0 55, 0 0"
                ></polyline>
                <text
                  x="50%"
                  y="35%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="black"
                >
                  Register a
                </text>
                <text
                  x="50%"
                  y="65%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="black"
                >
                  Business
                </text>
                <polyline
                  className="o2"
                  points="0 0, 150 0, 150 55, 0 55, 0 0"
                ></polyline>
              </svg>
              {/* <span>Register a</span>
                  <span>Business</span> */}
            </div>

            <div
              className="buttonb"
              onClick={() => {
                this.props.history.push("/CustomerLogin");
              }}
            >
              <svg>
                <polyline
                  className="o1"
                  points="0 0, 150 0, 150 55, 0 55, 0 0"
                ></polyline>
                <text
                  x="50%"
                  y="35%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="black"
                >
                  Register as
                </text>
                <text
                  x="50%"
                  y="65%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="black"
                >
                  a Customer
                </text>
                <polyline
                  className="o2"
                  points="0 0, 150 0, 150 55, 0 55, 0 0"
                ></polyline>
              </svg>
              {/* <span>Register a</span>
                  <span>Business</span> */}
            </div>
          </div>
          <br />
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Or if you already have an account...
          </h2>
          <div
            className="buttonb"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            <svg>
              <polyline
                className="o1"
                points="0 0, 150 0, 150 55, 0 55, 0 0"
              ></polyline>
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="black"
              >
                Login
              </text>

              <polyline
                className="o2"
                points="0 0, 150 0, 150 55, 0 55, 0 0"
              ></polyline>
            </svg>
            {/* <span>Register a</span>
                  <span>Business</span> */}
          </div>
        </main>
      </div>
    );
  }
}

export default GetStarted;
