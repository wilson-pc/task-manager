import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { MenuItem, Menu } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button, Container } from "@material-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import firebase from "../../boot/firebase";
import { logOut } from "../../store/auth/action";
import { useSelector, useDispatch } from "react-redux";
import {
  LoginPage,
  MyBoardsPage,
  RegisterPage,
  BoardPage,
  HomePage,
} from "../../pages";
import useStyles from "./main_layout_styles";
import { PrivateRoute } from "../../components";

function MainLayout(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const exit = async () => {
    await firebase.auth().signOut();
    dispatch(logOut());
    handleMenuClose();
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/my-boards")}>
        Mis tableros
      </MenuItem>
      <MenuItem onClick={exit}>Salir</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = () => {
    if (loggedIn) {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => history.push("/my-boards")}>
            Mis tableros
          </MenuItem>
          <MenuItem onClick={exit}>Salir</MenuItem>
        </Menu>
      );
    } else {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
          <MenuItem onClick={() => history.push("/register")}>
            Registrarse
          </MenuItem>
        </Menu>
      );
    }
  };
  const renderMenuAuth = () => {
    if (loggedIn) {
      return (
        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
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

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Task Manager
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            ></IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {renderMenuAuth()}
        </Toolbar>
      </AppBar>
      {renderMobileMenu()}
      {renderMenu}

      <Container style={{ overflowY: "auto" }}>
        <br></br>

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>

          <PrivateRoute
            path="/my-boards"
            component={MyBoardsPage}
            isAuthenticated={loggedIn}
          />
          <Route exact path="/board/:id">
            <BoardPage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default MainLayout;
