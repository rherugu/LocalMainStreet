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
  const [disabled2, setDisabled2] = useState("flex");
  var [idtemp, setidtemp] = useState("i");
  const [website, setWebsite] = useState(false);

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
    <div className={props.className} id="cardWrapper">
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
            className="cardBtn"
          >
            {props.website != " " ? `Go to their website` : ""}
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
  );
}
