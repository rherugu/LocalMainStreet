import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    backgroundImage: `url(${require("./Assets/defaulticon.png")})`,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  return (
    <div className={props.className}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="./Assets/defaulticon.png"
            style={{
              backgroundImage: `url(${require("./Assets/defaulticon.png")})`,
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.bname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
            <br></br>
            <small>
              <p>Phone: {props.phoneNumber}</p>
            </small>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              props.history.push({
                pathname: "/Buy",
                state: {
                  bname: props.bname,
                  description: props.description,
                  phoneNumber: props.phoneNumber,
                  className: "Buy",
                },
              });
            }}
          >
            Buy Gift Cards
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
    </div>
  );
}
