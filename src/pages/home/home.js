import React, { Component, componentDidMount } from "react";
import { BoardItem } from "../../components";
import Grid from "@material-ui/core/Grid";
import firebase from "../../boot/firebase";
const boards = firebase.firestore().collection("boards");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { boards: [] };
  }
  async componentDidMount() {
    boards.onSnapshot((querySnapshot) => {
      let docs = [];

      querySnapshot.forEach((doc) => {
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
        <Grid container spacing={3}>
          {this.state.boards.map((board) => (
            <Grid item={true} md={3} key={board.id}>
              <BoardItem board={board} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Home;
