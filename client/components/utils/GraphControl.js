import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../store/singleData';
import { postGraph } from '../../store/graph';
import {
  LineGraph,
  BarGraph,
  PieGraph,
  ScatterChart,
} from '../graphCharts/index';
import { ChatDrawer } from '../sidedrawers/ChatDrawer';
import {
  Typography,
  Button,
  FormControlLabel,
  Switch,
  FormGroup,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import {
  graphSuggestor,
  formatForVictory,
  dynamicVals,
  download,
  saveImg,
} from '../utils';
import { fetchAllUsers } from '../../store/users';
import Alert from '@material-ui/lab/Alert';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';

const io = require('socket.io-client');
const socket = io();

const sampleData = [
  { quarter: '1', earnings: 13, items: 40, state: 'NY' },
  { quarter: '2', earnings: 16, items: 60, state: 'NJ' },
  { quarter: '3', earnings: 17, items: 70, state: 'PA' },
  { quarter: '4', earnings: 18, items: 80, state: 'NY' },
  { quarter: '4', earnings: 18, items: 81, state: 'NY' },
  { quarter: '4', earnings: 19, items: 90, state: 'NY' },
];

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '24ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 125,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
});

class GraphControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: +this.props.match.params.dataId || '',
      graph: '',
      x: '',
      y: '',
      title: '',
      xTitle: '',
      yTitle: '',
      color: '',
      highlight: '',
      pieColor: '',
      checkedDonut: true,
      checkedHalf: true,
      checkedPadding: true,

      openSnack: false,
      img: '/Users/kevinkim/VizWiz/public/images/Graph.png',
    };
    this.leaveRoom = this.leaveRoom.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
    this.saveGraph = this.saveGraph.bind(this);
    this.saveGraphDB = this.saveGraphDB.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();

    if (this.props.location.state) {
      this.setState({
        selectedDataset: '',
        graph: this.props.location.state.graph.properties.graph || '',
        x: this.props.location.state.graph.properties.x || '',
        y: this.props.location.state.graph.properties.y || '',
        title: this.props.location.state.graph.properties.title || '',
        xTitle: this.props.location.state.graph.properties.xTitle || '',
        yTitle: this.props.location.state.graph.properties.yTitle || '',
        color: this.props.location.state.graph.properties.color || '',
        highlight: this.props.location.state.graph.properties.highlight || '',
      });
    }

    socket.emit('joinRoom', this.props.singleRoom, this.props.user);

    socket.on('receiveCode', (payload) => {
      this.updateCodeFromSockets(payload);
    });
  }

  updateCodeFromSockets(payload) {
    let attribute = Object.keys(payload)[0];
    let updated = Object.values(payload)[0];
    this.changeStyle(updated, attribute, 'sockets');
  }

  changeStyle(e, attribute, source) {
    let updated;
    if (e && e.target) {
      updated = { value: e.target.value, user: this.props.user.username };
    } else {
      updated = { value: e, user: this.props.user.username };
    }

    if (e && e.target) {
      attribute = e.target.name;
    }

    switch (attribute) {
      case 'graph':
        this.setState({
          [attribute]: updated.value,
          x: this.state.x,
          y: this.state.y,
        });
        break;
      case 'x':
        this.setState({
          [attribute]: updated.value,
          graph: this.state.graph,
          y: this.state.y,
        });
        break;
      case 'y':
        this.setState({
          [attribute]: updated.value,
          graph: this.state.graph,
          x: this.state.x,
        });
        break;
      case 'dataId':
        this.setState({
          [attribute]: Number(updated.value),
          graph: '',
          x: '',
          y: '',
        });
        break;
      case 'title':
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case 'xTitle':
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case 'yTitle':
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case 'color':
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case 'highlight':
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case 'pieColor':
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case 'checkedDonut':
        this.setState({
          [attribute]: !this.state[attribute],
        });
        break;
      case 'checkedHalf':
        this.setState({
          [attribute]: !this.state[attribute],
        });
        break;
      case 'checkedPadding':
        this.setState({
          [attribute]: !this.state[attribute],
        });
        break;
      default:
        this.setState({
          [attribute]: updated.value,
        });
    }

    let change = {
      [attribute]: updated.value,
      userThatMadeChanges: updated.user,
    };

    if (!source) {
      socket.emit('newChanges', this.props.singleRoom, change);
    }
  }

  async saveGraph() {
    let png = await saveImg(this.state.title, this.saveGraphDB);
  }

  saveGraphDB(png) {
    this.setState(
      {
        img: png,
      },
      () => {
        this.props.postGraph(this.state, this.props.userId, this.state.dataId);
      }
    );
  }

  handleClose(evt, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnack: false });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.saveGraph();
    this.setState({
      openSnack: true,
    });
    console.log('handlesubmit state >>>', evt);
    console.log('handlesubmit state >>>', this.state);
  }

  leaveRoom() {
    socket.emit('leaveRoom', this.props.singleRoom, this.props.user);
    this.props.history.push('/home');
  }

  render() {
    let matchingUser;

    if (!this.props.singleRoom) {
      matchingUser = this.props.allUsers.filter((user) => {
        return user.id === this.props.userId;
      });
    } else {
      matchingUser = this.props.allUsers.filter((user) => {
        return user.roomKey === this.props.singleRoom;
      });
    }

    const matchingUserData = matchingUser[0].data;

    const correctData = matchingUserData.filter(
      (dataSet) => dataSet.id === this.state.dataId
    );

    let data;

    {
      correctData.length ? (data = correctData[0].values) : (data = sampleData);
    }

    const firstLine = data[0] || {};

    const keys = Object.keys(firstLine);

    let obj = {};

    for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i];
      obj[currentKey] = [];
      data.map((item) => obj[currentKey].push(item[currentKey]));
    }

    // populating x & y axis
    const xPossibilities1 = dynamicVals(data, 'string', keys);
    const xPossibilities2 = dynamicVals(data, 'number', keys);
    const xPossibilities = [...xPossibilities1, ...xPossibilities2];
    const yPossibilities = dynamicVals(data, 'number', keys);

    let xValues, yValues;
    let suggestions = [];
    let formattedData = [];

    if (this.state.x && this.state.y) {
      xValues = data.map((dataObj) => {
        if (dataObj[this.state.x]) {
          return dataObj[this.state.x];
        } else return null;
      });
      yValues = data.map((dataObj) => {
        if (dataObj[this.state.y]) {
          return dataObj[this.state.y];
        } else return null;
      });

      suggestions = graphSuggestor(xValues, yValues, this.state.x);
      // data will be cleaned up on following line:
      formattedData = formatForVictory(xValues, yValues);
    } else if (this.state.x) {
      suggestions.push('pie');
    }
    // clean data, create suggestions, reformat data

    const { changeStyle, handleSubmit, handleClose } = this;

    const graphSelected = this.state.graph;
    const dataset = this.props.unformatted.name;

    let graphProperties = {
      ...this.state,
      formattedData: formattedData,
    };

    const graphDictionary = {
      bar: <BarGraph {...graphProperties} />,
      line: <LineGraph {...graphProperties} />,
      scatter: <ScatterChart {...graphProperties} />,
      pie: <PieGraph {...graphProperties} />,
    };

    const { classes } = this.props;

    return (
      <div className="main-box">
        <div className="left-container">
          <div className="suggestions-container">
            {this.state.x ? (
              <div id="suggestions">
                <h5>
                  Suggested graph types based on your dataset and axis
                  selections:
                </h5>
                <ul>
                  {suggestions.map((suggestion, idx) => {
                    return (
                      <li
                        key={idx}
                        style={{
                          textDecoration: 'none',
                          listStyleType: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        {suggestion.toUpperCase()}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <h3>Select data for your axis.</h3>
            )}
          </div>
          <div className="graph-container">
            {graphDictionary[graphSelected]}
          </div>
        </div>

        <div className="right-container">
          <div className="setting-selectors">
            <h2>{dataset}</h2>
            <div>
              <FormControl
                variant="outlined"
                margin="dense"
                className={classes.formControl}
              >
                <InputLabel id="data-selector">Data Set</InputLabel>
                <Select
                  name="dataId"
                  value={this.state.dataId}
                  onChange={changeStyle}
                  label="Data Set"
                >
                  <MenuItem value="" disabled selected>
                    <em>Data Set</em>
                  </MenuItem>
                  {matchingUserData.map((data, idx) => (
                    <MenuItem key={idx} value={data.id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl
                variant="outlined"
                margin="dense"
                className={classes.formControl}
              >
                <InputLabel id="x-selector">X-Axis</InputLabel>
                <Select
                  name="x"
                  value={this.state.x}
                  onChange={changeStyle}
                  label="X-Axis"
                >
                  {xPossibilities.map((key, idx) => (
                    <MenuItem key={idx} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                margin="dense"
                className={classes.formControl}
              >
                <InputLabel id="y-selector">Y-Axis</InputLabel>
                <Select
                  name="y"
                  value={this.state.y}
                  onChange={changeStyle}
                  label="Y-Axis"
                >
                  {yPossibilities.map((key, idx) => (
                    <MenuItem key={idx} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  className={classes.formControl}
                >
                  <InputLabel id="graph">Graph Type</InputLabel>
                  <Select
                    name="graph"
                    value={this.state.graph}
                    onChange={changeStyle}
                    label="Graph Type"
                  >
                    <MenuItem value="" disabled selected>
                      <em>Graph Type</em>
                    </MenuItem>
                    {suggestions.map((suggestion, idx) => (
                      <MenuItem key={idx} value={suggestion}>
                        {suggestion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="seperator">
                <Typography>Customize:</Typography>
              </div>
              <div className="style-selectors">
                <div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="data-title"
                      type="text"
                      name="title"
                      label="Title"
                      onChange={this.changeStyle}
                      value={this.state.title}
                    />
                  </form>
                </div>
                {graphSelected === 'pie' ? (
                  <div id="for-pie">
                    <div id="pie-switches">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedDonut}
                              onChange={changeStyle}
                              name="checkedDonut"
                            />
                          }
                          label="Donut"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedHalf}
                              onChange={changeStyle}
                              name="checkedHalf"
                            />
                          }
                          label="Half"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedPadding}
                              onChange={changeStyle}
                              name="checkedPadding"
                            />
                          }
                          label="Spacers"
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <select
                        name="pieColor"
                        onChange={changeStyle}
                        value={this.state.pieColor}
                      >
                        <option value="" disabled selected>
                          Color Themes
                        </option>
                        <option value="cool">Cool</option>
                        <option value="warm">Warm</option>
                        <option value="qualitative">Classic</option>
                        <option value="heatmap">Heatmap</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div id="not-pie">
                    <div>
                      <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="xTitle"
                          type="text"
                          name="xTitle"
                          label="X-Axis"
                          onChange={this.changeStyle}
                          value={this.state.xTitle}
                        />
                        <TextField
                          id="yTitle"
                          type="text"
                          name="yTitle"
                          label="Y-Axis"
                          onChange={this.changeStyle}
                          value={this.state.yTitle}
                        />
                      </form>
                    </div>
                    <div>
                      <FormControl
                        margin="dense"
                        className={classes.formControl}
                      >
                        <InputLabel id="color-selector">Color</InputLabel>
                        <Select
                          name="color"
                          value={this.state.color}
                          onChange={changeStyle}
                        >
                          <MenuItem value="#428A51">Forrest Green</MenuItem>
                          <MenuItem value="#4680C3">Sky Blue</MenuItem>
                          <MenuItem value="#B80040">Rasberry Hue</MenuItem>
                          <MenuItem value="#D3B673">Basic Beige</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                )}
                <div>
                  <FormControl margin="dense" className={classes.formControl}>
                    <InputLabel id="highlight-selector">Highlight</InputLabel>
                    <Select
                      name="highlight"
                      value={this.state.highlight}
                      onChange={changeStyle}
                    >
                      <MenuItem value="#73070B">Crimson Red</MenuItem>
                      <MenuItem value="#FFCB47">Sunflower Yellow</MenuItem>
                      <MenuItem value="#FFD2A6">Sherbert Orange</MenuItem>
                      <MenuItem value="#A2AEBB">Cadet Blue</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="btn-container">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Snackbar
                open={this.state.openSnack}
                autoHideDuration={3000}
                onClose={this.handleClose}
              >
                <Alert onClose={this.handleClose} severity="success">
                  Graph saved!
                </Alert>
              </Snackbar>
              <Button
                type="submit"
                variant="contained"
                color="default"
                onClick={() => download(this.state.title)}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <Tooltip title="Leave Room" placement="top" arrow>
                <IconButton
                  className="leaveButton"
                  color="secondary"
                  onClick={() => this.leaveRoom()}
                >
                  <MeetingRoomIcon />
                </IconButton>
              </Tooltip>
            </div>
            <canvas
              id="canvas"
              width="500"
              height="350"
              display="none"
              style={{
                visibility: 'hidden',
                zIndex: -950,
                position: 'absolute',
              }}
            />
          </div>
          <ChatDrawer />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    unformatted: state.singleData.unformatted,
    userId: state.auth.id,
    userData: state.data.data,
    user: state.auth,
    rooms: state.rooms.allRooms,
    singleRoom: state.rooms.singleRoom,
    allUsers: state.users,
    dataId: state.singleData.dataId,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleData: (userId, dataId) =>
      dispatch(fetchSingleData(userId, dataId)),
    postGraph: (graphData, userId, dataId) =>
      dispatch(postGraph(graphData, userId, dataId)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(withStyles(styles)(GraphControl));
