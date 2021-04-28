import React, { useEffect, useCallback } from "react";
import "./App.css";
import { MainLayout } from "./layouts";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const { waitingUser } = useSelector((state) => state.auth);
  //const incrementCounter = useCallback(() => dispatch(logOut), [dispatch]);

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
        dispatch(
          logIn({
            loggedIn: true,
            waitingUser: false,
            user: {
              id: doc.id,
              uid: user.uid,
              phone: user.phoneNumber,
              username: user.displayName,
            },
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  }, []);
  return waitingUser ? (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <MainLayout></MainLayout>
  );
}

export default App;
