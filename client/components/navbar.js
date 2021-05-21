import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LeftDrawer from "./LeftDrawer";
import Typography from "@material-ui/core/Typography";
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
	flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#000",
  },
}));

const Navbar = ({ isLoggedIn, userId }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
          {isLoggedIn ? (
            <LeftDrawer userId={userId} />
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <Typography variant="h6" >
                  Login
                </Typography>
              </Link>
              <Link to="/signup">
                <Typography variant="h6" >
                  Sign Up
                </Typography>
              </Link>
            </div>
          )}
        </div>
    </ThemeProvider>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

export default connect(mapState, null)(Navbar);
