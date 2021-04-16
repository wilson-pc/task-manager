import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MuiEditableLabel from "mui-editable-label";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { withRouter } from "react-router-dom";
import "./board_item.css";

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
                  <MuiEditableLabel
                    initialValue={this.props.board.name}
                  ></MuiEditableLabel>
                ) : (
                  this.props.board.name
                )}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h6">
                {this.props.private ? (
                  <MuiEditableLabel
                    className="edit-description"
                    initialValue={this.props.board.description}
                  ></MuiEditableLabel>
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
