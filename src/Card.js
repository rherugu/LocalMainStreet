import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Card.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginRight: 0,
  },
  media: {
    height: 140,
    backgroundSize: "cover",
    wordWrap: "break-word",
    width: "auto",
  },
});

function MediaCard(props) {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState("flex");
  var [idtemp, setidtemp] = useState("i");
  const [website, setWebsite] = useState(false);
  const [dialogOpen, setdialogOpen] = React.useState(false);
  const [dialogOpen2, setdialogOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };
  const handleClickOpen2 = () => {
    setdialogOpen2(true);
  };

  const handleClose2 = () => {
    setdialogOpen2(false);
  };

  useEffect(() => {
    (() => {
      if (props.website === " ") {
        setWebsite(true);
      }
      if (props.stripeId === "temporary") {
        setDisabled(true);
      }
    })();
  }, []);

  const matches = useMediaQuery("(max-width:437px)");

  var image;
  if (props.businessCatagory === "Restaurant") {
    image = "resteraunt.png";
  } else if (props.businessCatagory === "Hair and Nail Salon") {
    image = "salon.png";
  } else if (props.businessCatagory === "Grocery") {
    image = "grocery.png";
  } else if (props.businessCatagory === "Auto") {
    image = "auto.png";
  } else if (props.businessCatagory === "Spa & Beauty") {
    image = "spa.jpg";
  } else if (props.businessCatagory === "Massage Parlour") {
    image = "massage.png";
  } else if (props.businessCatagory === "Recreation") {
    image = "recreation.png";
  } else if (props.businessCatagory === "Coffee & Bakery") {
    image = "coffee.png";
  } else {
    image = "defaulticon.png";
  }

  return (
    <div id="totalCardWrapper" className="ripple">
      <div
        data-tip={props.description}
        data-multiline="true"
        className={props.className} // Media
        id="cardWrapper"
        onClick={handleClickOpen}
      >
        <div
          className={classes.root}
          style={{
            marginRight: "15px",
            marginLeft: "15px",
          }}
          id="Cardoo"
        >
          {/* <CardMedia
            className={classes.media}
            id="media"
            image="./Assets/defaulticon.png"
            style={{
              backgroundImage: `url(${require(`./Assets/${image}`)})`,
              backgroundSize: "cover",
            }}
          /> */}
          <div className="content MediaCard1">
            <div gutterBottom variant="h5" component="h2">
              {props.bname}
            </div>
          </div>

          <div className="MediaCard1 btn">
            <Button
              size="small"
              color="primary"
              variant="outlined"
              style={{
                display: disabled ? "none" : "inline-flex",
              }}
              onClick={() => {
                setdialogOpen(false);
                if (localStorage.getItem("type") === "business") {
                  handleClickOpen2();
                  setdialogOpen(false);
                } else if (localStorage.getItem("type") === "customer") {
                  props.history.push({
                    pathname: "/Buy",
                    state: {
                      bname: props.bname,
                      description: props.description,
                      phoneNumber: props.phoneNumber,
                      className: "Buy",
                      id: props.stripeId,
                      address: props.address,
                      email: props.emailb,
                      coupon: props.coupon,
                    },
                  });
                } else if (localStorage.getItem("type") === "loggedout") {
                  props.history.push({
                    pathname: "/Buy",
                    state: {
                      bname: props.bname,
                      description: props.description,
                      phoneNumber: props.phoneNumber,
                      className: "Buy",
                      id: props.stripeId,
                      address: props.address,
                      email: props.emailb,
                      coupon: props.coupon,
                    },
                  });
                } else if (localStorage.getItem("type") === null) {
                  props.history.push({
                    pathname: "/Buy",
                    state: {
                      bname: props.bname,
                      description: props.description,
                      phoneNumber: props.phoneNumber,
                      className: "Buy",
                      id: props.stripeId,
                      address: props.address,
                      email: props.emailb,
                      coupon: props.coupon,
                    },
                  });
                }
              }}
              className="cardBtn cardBtn1"
            >
              Buy Gift Cards
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={() => {
                setdialogOpen(false);
                setTimeout(() => {
                  window.open(`${props.website}`, "_blank");
                }, 500);
              }}
              disabled={website}
              className="cardBtn cardBtn2"
              variant="outlined"
              style={{
                margin: disabled ? "0" : "auto",
                display: disabled ? (website ? "none" : "inline-flex") : "none",
              }}
            >
              {props.website != " "
                ? `${!matches ? "Go to their website" : "Website"}`
                : ""}
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                setdialogOpen(false);
                setTimeout(() => {
                  window.open(`${props.website}`, "_blank");
                }, 500);
              }}
              disabled={website}
              className="cardBtn cardBtn2 cardBtn2222222233333444"
              style={{
                display: disabled ? "none" : "inline-flex",
              }}
            >
              {props.website != " "
                ? `${!matches ? "Go to their website" : "Website"}`
                : ""}
            </Button>
          </div>
        </div>

        {/* <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.bname[1]}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description[1]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Buy Gift Cards
          </Button>
        </CardActions>
      </Card> */}
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        style={{
          zIndex: 999999999,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.bname}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          <br />
          <DialogContentText id="alert-dialog-description">
            {props.address}
          </DialogContentText>
          <br />
          <DialogContentText id="alert-dialog-description">
            {props.phoneNumber}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogOpen2}
        onClose={handleClose2}
        style={{
          zIndex: 999999999,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You cannot buy a product if you are logged in as a business.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Buying a product while logged in as a business is disabled. If you
            want to buy this product, please click{" "}
            <a href="/CustomerLogin">here</a> to register a new customer
            account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* 
      <ReactTooltip
        className="CardTooltip"
        multiline={true}
        place="right"
        type="info"
        effect="solid"
        clickable={false}
      /> */}
    </div>
  );
}

export default React.memo(MediaCard);
