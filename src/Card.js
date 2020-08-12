import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Card.css";
import $ from "jquery";
import ReactTooltip from "react-tooltip";
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

export default function MediaCard(props) {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState("flex");
  var [idtemp, setidtemp] = useState("i");
  const [website, setWebsite] = useState(false);
  const [dialogOpen, setdialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
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
    <div id="totalCardWrapper">
      <div
        data-tip={props.description}
        data-multiline="true"
        className={props.className}
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
              onClick={() => {
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
                  },
                });
              }}
              className="cardBtn cardBtn1"
              disabled={disabled}
            >
              Buy Gift Cards
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={() => {
                setTimeout(() => {
                  window.open(`${props.website}`, "_blank");
                }, 500);
              }}
              disabled={website}
              className="cardBtn cardBtn2"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ReactTooltip
        className="CardTooltip"
        multiline={true}
        place="right"
        type="info"
        effect="solid"
        clickable={false}
      />
    </div>
  );
}
