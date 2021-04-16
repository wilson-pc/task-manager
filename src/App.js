import React, { useEffect } from "react";
import "./App.css";
import { MainLayout } from "./layouts";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn, logOut } from "./store/auth/action";
import { Backdrop, CircularProgress } from "@material-ui/core";
import firebase from "./boot/firebase";
const users = firebase.firestore().collection("users");

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setOpen(false);
      if (user) {
        const querySnapshot = await users.where("authId", "==", user.uid).get();
        let doc = {};
        querySnapshot.forEach((rp) => {
          console.log(rp);
          doc = { id: rp.id };
        });
        console.log(doc);
        props.handlelogIn({
          loggedIn: true,
          waitingUser: false,
          user: {
            id: doc.id,
            uid: user.uid,
            phone: user.phoneNumber,
            username: user.displayName,
          },
        });
      } else {
        props.handlelogOut();
      }
    });
  }, []);
  return props.waitingUser ? (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <MainLayout></MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    waitingUser: state.auth.waitingUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handlelogOut: logOut,

      handlelogIn: (payload) => dispatch(logIn(payload)),
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
