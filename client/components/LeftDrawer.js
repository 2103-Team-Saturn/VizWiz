import React from 'react';
import clsx from 'clsx';
import { logout } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PieChartIcon from '@material-ui/icons/PieChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(3),
    // ^ moves content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  linkText: {
    color: 'black',
    textDecoration: 'none',
  },
  logo: {
    maxWidth: 60,
  },
  logout: {
    alignSelf: 'flex-end',
  },
  title: {
    flexGrow: 1,
    color: '#000',
  },
  imageContainer: {
    flexGrow: 1,
  },
}));

function LeftMiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { userId, handleClick } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/home">
                <Button edge="start" className={classes.menuButton}>
                  <div className={classes.imageContainer}>
                    <img src="/images/VizWiz.png" className={classes.logo} />
                  </div>
                  <div style={{ alignItems: 'end' }}>
                    <Typography variant="h4">VizWiz</Typography>
                  </div>
                </Button>
              </Link>
            </div>
            <div>
              <Button
                className={classes.logout}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleClick}
                endIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          <Link to={`/users/${userId}/history`}>
            <Tooltip title="My Graphs" placement="right">
              <ListItem button key="my-graphs">
                <ListItemIcon>{<PieChartIcon fontSize="large" />}</ListItemIcon>
                <ListItemText
                  primary="My Graphs"
                  className={classes.linkText}
                />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to={`/users/${userId}/data`}>
            <Tooltip title="My Data" placement="right">
              <ListItem button key="my-data">
                <ListItemIcon>
                  {<AssessmentIcon fontSize="large" />}
                </ListItemIcon>
                <ListItemText primary="My Data" className={classes.linkText} />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to="/room">
            <Tooltip title="Join a Room" placement="right">
              <ListItem button key="join-room">
                <ListItemIcon>
                  {<GroupWorkIcon fontSize="large" />}
                </ListItemIcon>
                <ListItemText
                  primary="Join a Room"
                  className={classes.linkText}
                />
              </ListItem>
            </Tooltip>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch)(LeftMiniDrawer);
