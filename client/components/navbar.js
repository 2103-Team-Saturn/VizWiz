import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import LeftDrawer from "./LeftDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#e0e0e0",
    },
    secondary: {
      main: "#38b6ff",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#000",
  },
  navDisplayFlex: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Navbar = ({ isLoggedIn, userId }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <div className={classes.navDisplayFlex}>
          {isLoggedIn ? (
            <LeftDrawer userId={userId} />
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <Typography variant="h6" className={classes.title}>
                  Login
                </Typography>
              </Link>
              <Link to="/signup">
                <Typography variant="h6" className={classes.title}>
                  Sign Up
                </Typography>
              </Link>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

// const mapDispatch = (dispatch) => {
// 	return {
// 		handleClick() {
// 			dispatch(logout());
// 		},
// 	};
// };

export default connect(mapState, null)(Navbar);
