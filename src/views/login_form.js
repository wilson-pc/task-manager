import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import firebase from "../boot/firebase";
import Alert from "@material-ui/lab/Alert";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      state: false,
      verificationcode: "",
      count: 1,
      codeError: false,
      captcha: true,
    };
  }
  handleEnter = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ state: true });
  };
  handleVerify = (e) => {
    e.preventDefault();
    window.confirmationResult
      .confirm(document.getElementById("verificationcode").value)
      .then((result) => {
        this.props.history.push({
          pathname: `/`,
        });
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
          <form onSubmit={this.handleEnter}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="Numero de telefono"
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
                  Entrar
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
                  console.log(confirmationResult);
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
          <form onSubmit={this.handleVerify}>
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

export default withRouter(LoginForm);
