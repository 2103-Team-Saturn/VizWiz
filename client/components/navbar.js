import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LeftDrawer from './LeftDrawer';
import { Typography, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e0e0e0',
    },
    secondary: {
      main: '#38b6ff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#000',
  },
  imageContainer: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 60,
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
          <AppBar position="fixed">
            <Toolbar>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Button edge="start" className={classes.menuButton}>
                  <div className={classes.imageContainer}>
                    <img src="/images/VizWiz.png" className={classes.logo} />
                  </div>
                  <div style={{ alignItems: 'end' }}>
                    <Typography variant="h4">VizWiz</Typography>
                  </div>
                </Button>
              </div>
            </Toolbar>
          </AppBar>
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
