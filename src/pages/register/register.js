import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./register.css";
import RegisterForm from "../../views/register_form";

class RegisterPage extends React.Component {
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
                    Register
                  </Typography>
                </Grid>
                <RegisterForm></RegisterForm>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default RegisterPage;
