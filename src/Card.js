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
  const [website, setWebsite] = useState(false);

  useEffect(() => {
    (() => {
      if (props.stripeId === "temporary") {
        setDisabled(true);
      }
      if (props.website === " ") {
        setWebsite(true);
      }
    })();
  }, []);

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
  $(document).ready(function () {
    $(".MediaCard1").on("contextmenu", function () {
      return false;
    });
  });
  return (
    <div
      className={props.className}
      id="cardWrapper"
      style={{
        display: "inline-block",
        // margin: "0 auto",
        marginRight: "0",
      }}
    >
      <Card
        className={classes.root}
        style={{
          marginRight: "15px",
          marginLeft: "15px",
        }}
        id="Cardoo"
      >
        <CardActionArea
          className="MediaCard1"
          onClick={() => {
            setTimeout(function () {
              props.history.push({
                pathname: "/Buy",
                state: {
                  bname: props.bname,
                  description: props.description,
                  phoneNumber: props.phoneNumber,
                  className: "Buy",
                  businessCatagory: props.businessCatagory,
                  id: props.stripeId,
                  address: props.address,
                  email: props.emailb,
                },
              });
            }, 500);
          }}
          disabled={disabled}
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
          <CardContent className="content MediaCard1">
            <Typography gutterBottom variant="h5" component="h2">
              {props.bname}
            </Typography>
            {/* <Typography
              variant="body2"
              color="textSecondary"
              className="typographywrap at"
              component="p"
            >
              {props.description}
            </Typography> */}
            <br></br>
            <small>
              <p>Phone: {props.phoneNumber}</p>
            </small>
          </CardContent>
        </CardActionArea>
        <CardActions className="MediaCard1">
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
            className="cardBtn"
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
          >
            {props.website != " " ? `Go to their website` : ""}
          </Button>
        </CardActions>
      </Card>

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
      <br></br>
    </div>
  );
}
