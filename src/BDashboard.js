import React from "react";

class BDashboard extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <input
            style={{
              maxWidth: "60%",
              textAlign: "center",
              height: "100px",
              fontSize: "30px",
            }}
            className="Bdash"
            type="button"
            value="Click to go to your dashboard"
            onClick={() => {
              this.props.history.push({
                pathname: "/Dashboard",
                state: {
                  stripeAccountId: this.props.location.state.stripeAccountId,
                },
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default BDashboard;
