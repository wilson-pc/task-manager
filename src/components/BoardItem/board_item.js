import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { EditText } from "..";
import { withRouter } from "react-router-dom";
import firebase from "../../boot/firebase";
import "./board_item.css";
const boards = firebase.firestore().collection("boards");

const useStyles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};
class BoardItem extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              image="https://ik.imagekit.io/ebfrktu6zh/taskManager/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada_DvxWXneiV.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.private ? (
                  <EditText
                    multiline={false}
                    text={this.props.board.name}
                    keyEnter={(text) => {
                      boards.doc(this.props.board.id).update({ name: text });
                    }}
                  ></EditText>
                ) : (
                  this.props.board.name
                )}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h6">
                {this.props.private ? (
                  <EditText
                    multiline={true}
                    text={this.props.board.description}
                    keyEnter={(text) => {
                      boards
                        .doc(this.props.board.id)
                        .update({ description: text });
                    }}
                  ></EditText>
                ) : (
                  this.props.board.description
                )}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() =>
                this.props.history.push({
                  pathname: `/board/` + this.props.board.id,
                })
              }
            >
              Ver tablero
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

BoardItem.propTypes = {
  classes: PropTypes.object.isRequired,
  private: PropTypes.bool,
};

export default withStyles(useStyles)(withRouter(BoardItem));
