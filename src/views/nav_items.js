import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import firebase from "../boot/firebase";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes, history } = this.props;
    const menuId = "primary-search-account-menu";
    const renderMenuAuth = () => {
      if (this.props.loggedIn) {
        return (
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        );
      } else {
        return (
          <div className={classes.sectionDesktop}>
            {" "}
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => history.push("/register")}>
              Register
            </Button>
          </div>
        );
      }
    };

    return renderMenuAuth();
  }
}

NavItem.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(withRouter(NavItem));
