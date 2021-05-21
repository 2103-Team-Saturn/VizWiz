import React, { Children, Component } from 'react';
import { connect } from 'react-redux';
import { gotSingleRoom } from '../../store/room';
import { fetchAllUsers } from '../../store/users';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import EnterIconOne from '@material-ui/icons/MeetingRoom';
import ArrowIcon from '@material-ui/icons/CallMerge';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';

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

const styles = (theme) => ({
  container: {
    marginTop: 150,
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    marginTop: 5,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  paper: {
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  },
});

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

class RoomForm extends Component {
  constructor() {
    super();
    this.state = {
      roomKey: '',
      yourRoom: true,
      otherRoom: false,
      tabValue: 0,
      redirect: null,
    };

    this.userRoomSubmit = this.userRoomSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  userRoomSubmit(userKey) {
    console.log(this.props);
    event.preventDefault();
    let roomKey = userKey;
    const users = this.props.allUsers;
    const match = users.filter((currentUser) => {
      return currentUser.roomKey === roomKey;
    });
    if (match.length) {
      this.props.fetchSingleRoom(roomKey);
      this.setState({ redirect: '/room/live' });
    } else {
      console.log('INVALID KEY');
    }
  }

  handleChange(event) {
    this.setState({ roomKey: event.target.value });
  }

  handleSubmit(userKey) {
    event.preventDefault();
    let roomKey = userKey;
    const users = this.props.allUsers;
    const match = users.filter((currentUser) => {
      return currentUser.roomKey === roomKey;
    });
    if (match.length) {
      this.props.fetchSingleRoom(roomKey);
      this.setState({ redirect: '/room/live' });
    } else {
      console.log('INVALID KEY');
    }
  }

  handleTabs(e, val) {
    this.setState({
      tabValue: val,
    });
  }

  render() {
    const userKey = this.props.user.roomKey;
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <ThemeProvider theme={customTheme}>
        <div className={classes.container}>
          <AppBar position="static" className="appBar">
            <Tabs
              indicatorColor="secondary"
              value={this.state.tabValue}
              onChange={this.handleTabs}
              centered
            >
              <Tab label="Enter Your Room" />
              <Tab label="Enter Another Room" />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.tabValue} index={0}>
            <Paper className={classes.paper}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel
                  ref={(ref) => {
                    this.labelRef = ReactDOM.findDOMNode(ref);
                  }}
                  htmlFor="user-key"
                >
                  Your Room ID:
                </InputLabel>
                <OutlinedInput
                  name="user-key"
                  onChange={this.handleChange}
                  value={userKey}
                  labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => this.userRoomSubmit(userKey)}
                >
                  Enter Your Room
                </Button>
              </FormControl>
            </Paper>
          </TabPanel>
          <TabPanel value={this.state.tabValue} index={1}>
            <Paper className={classes.paper}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel
                  ref={(ref) => {
                    this.labelRef = ReactDOM.findDOMNode(ref);
                  }}
                  htmlFor="room-key"
                >
                  Enter Room ID Here:
                </InputLabel>
                <OutlinedInput
                  name="room-key"
                  onChange={this.handleChange}
                  value={this.state.roomKey}
                  labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.handleSubmit(this.state.roomKey)}
                >
                  Enter Another Room
                </Button>
              </FormControl>
            </Paper>
          </TabPanel>
        </div>
      </ThemeProvider>
    );
  }
}

const mapState = (state) => ({
  data: state.singleData.unformatted,
  user: state.auth,
  allUsers: state.users,
  rooms: state.rooms.allRooms,
  singleRoom: state.rooms.singleRoom,
});

const mapDispatch = (dispatch) => ({
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  fetchSingleRoom: (roomKey) => dispatch(gotSingleRoom(roomKey)),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(RoomForm));
