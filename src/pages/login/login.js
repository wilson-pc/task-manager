import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./login.css";
import LoginForm from "../../views/login_form";
import { withRouter } from "react-router-dom";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <div id="recaptcha-container"></div>
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                </Grid>
                <LoginForm></LoginForm>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withRouter(LoginPage);
