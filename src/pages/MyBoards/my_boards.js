import React, { Component } from "react";
import { BoardItem } from "../../components";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import firebase from "../../boot/firebase";
import { CreateBoardDialog } from "../../components";

const boards = firebase.firestore().collection("boards");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      open: false,
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  async componentDidMount() {
    boards.where("userId", "==", this.props.user.id).onSnapshot((response) => {
      let docs = [];
      response.forEach((doc) => {
        docs.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          userId: doc.data().userId,
        });
      });
      this.setState({ boards: docs });
    });
  }

  render() {
    return (
      <div>
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Nuevo Tablero
        </Button>
        <CreateBoardDialog
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
        <br></br>
        <Grid container spacing={3}>
          {this.state.boards.map((board) => (
            <Grid item={true} md={3} key={board.id}>
              <BoardItem board={board} private={true} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Home);
