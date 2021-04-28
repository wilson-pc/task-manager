import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import firebase from "../boot/firebase";
import Alert from "@material-ui/lab/Alert";
import { withRouter } from "react-router-dom";

const users = firebase.firestore().collection("users");

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phone: "",
      state: false,
      verificationcode: "",
      count: 1,
      codeError: false,
      captcha: true,
    };
  }

  registerSubmit = (event) => {
    event.preventDefault();

    this.setState({ state: true });
  };
  codeVerifySubmit = (event) => {
    event.preventDefault();
    window.confirmationResult
      .confirm(document.getElementById("verificationcode").value)
      .then(async (result) => {
        console.log(result);
        if (result.additionalUserInfo.isNewUser) {
          console.log("register");
          const rep = await users.add({
            authId: result.user.uid,
            phone: this.state.phone,
            username: this.state.username,
          });
          console.log(rep);
          this.props.history.push({
            pathname: `/`,
          });
          return result.user.updateProfile({
            displayName: this.state.username,
          });
        } else {
          console.log("vfnhriegvjer login");
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({ codeError: true });
      });
  };
  render() {
    const { state, count } = this.state;

    const forms = () => {
      if (!state) {
        console.log("statetetetetete");
        return (
          <form onSubmit={this.registerSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="nombre de usuario"
                  fullWidth
                  name="username"
                  variant="outlined"
                  value={this.state.username}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  required
                  autoFocus
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="+59176482155"
                  fullWidth
                  name="phone"
                  variant="outlined"
                  value={this.state.phone}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  required
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button-block"
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      } else {
        if (count === 1) {
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
            }
          );
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
              return firebase
                .auth()
                .signInWithPhoneNumber(
                  this.state.phone,
                  window.recaptchaVerifier
                )
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  this.setState({ count: 2 });
                  this.setState({ captcha: false });
                });
            })
            .catch((error) => {
              // Handle Errors here.
              console.log(error);
            });
        }
        return (
          <form onSubmit={this.codeVerifySubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="Codigo de verificacion"
                  fullWidth
                  id="verificationcode"
                  name="verificationcode"
                  variant="outlined"
                  value={this.state.verificationcode}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  required
                  autoFocus
                />
              </Grid>

              <Grid item>
                {this.state.codeError ? (
                  <Alert severity="error">
                    Codigo de verificacion incorrecto
                  </Alert>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button-block"
                  disabled={this.state.captcha}
                >
                  Verificar
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }
    };

    return <Grid item>{forms()}</Grid>;
  }
}

export default withRouter(RegisterForm);
