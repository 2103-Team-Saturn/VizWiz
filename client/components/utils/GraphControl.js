import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleData } from "../../store/singleData";
import { postGraph } from "../../store/graph";
import {
  LineGraph,
  BarGraph,
  PieGraph,
  ScatterChart,
} from "../graphCharts/index";
const io = require("socket.io-client");
const socket = io();

import ReactDOM from "react-dom";

import {
  Grid,
  Typography,
  Button,
  Box,
  makeStyles,
  Container,
  FormControlLabel,
  Switch,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  FormGroup,
} from "@material-ui/core";

import DownloadIcon from "@material-ui/icons/CloudDownload";
import SaveIcon from "@material-ui/icons/Save";

import {
  graphSuggestor,
  formatForVictory,
  dynamicVals,
  download,
} from "../utils";
import { fetchAllUsers } from "../../store/users";
import ChatRoom from "../rooms/ChatRoom";

const sampleData = [
  { quarter: "1", earnings: 13, items: 40, state: "NY" },
  { quarter: "2", earnings: 16, items: 60, state: "NJ" },
  { quarter: "3", earnings: 17, items: 70, state: "PA" },
  { quarter: "4", earnings: 18, items: 80, state: "NY" },
  { quarter: "4", earnings: 18, items: 81, state: "NY" },
  { quarter: "4", earnings: 19, items: 90, state: "NY" },
];
class GraphControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: +this.props.match.params.dataId || "",
      graph: "",
      x: "",
      y: "",
      title: "",
      xTitle: "",
      yTitle: "",
      color: "",
      highlight: "",
      pieColor: "",
      checkedDonut: true,
      checkedHalf: true,
      checkedPadding: true,
    };
    this.leaveRoom = this.leaveRoom.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();

    if (this.props.location.state) {
      this.setState({
        selectedDataset: "", // Isabelle's dataset selection logic??
        graph: this.props.location.state.graph.properties.graph || "",
        x: this.props.location.state.graph.properties.x || "",
        y: this.props.location.state.graph.properties.y || "",
        title: this.props.location.state.graph.properties.title || "",
        xTitle: this.props.location.state.graph.properties.xTitle || "",
        yTitle: this.props.location.state.graph.properties.yTitle || "",
        // xAxis: this.props.location.state.xValues, // hold all values in array corresponding to user selected key
        // yAxis: this.props.location.state.yValues,
        color: this.props.location.state.graph.properties.color || "",
        highlight: this.props.location.state.graph.properties.highlight || "",
      });
    }

    socket.emit("joinRoom", this.props.singleRoom, this.props.user);

    socket.on("receiveCode", (payload) => {
      this.updateCodeFromSockets(payload);
    });
  }

  leaveRoom() {
    socket.emit("leaveRoom", this.props.singleRoom, this.props.user);
  }

  updateCodeFromSockets(payload) {
    let attribute = Object.keys(payload)[0];
    let updated = Object.values(payload)[0];
    this.changeStyle(updated, attribute, "sockets");
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
      case "graph":
        this.setState({
          [attribute]: updated.value,
          x: this.state.x,
          y: this.state.y,
        });
        break;
      case "x":
        this.setState({
          [attribute]: updated.value,
          graph: this.state.graph,
          y: this.state.y,
        });
        break;
      case "y":
        this.setState({
          [attribute]: updated.value,
          graph: this.state.graph,
          x: this.state.x,
        });
        break;
      case "dataId":
        this.setState({
          [attribute]: Number(updated.value),
          graph: "",
          x: "",
          y: "",
        });
        break;
      case "title":
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case "xTitle":
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case "yTitle":
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case "color":
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case "highlight":
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case "pieColor":
        this.setState({
          [attribute]: updated.value,
        });
        break;
      case "checkedDonut":
        this.setState({
          [attribute]: !this.state[attribute],
        });
        break;
      case "checkedHalf":
        this.setState({
          [attribute]: !this.state[attribute],
        });
        break;
      case "checkedPadding":
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
      socket.emit("newChanges", this.props.singleRoom, change);
    }
  }

  saveGraph() {
    this.props.postGraph(this.state, this.props.userId, this.state.dataId);
  }

  render() {
    console.log("props", this.props);
    const matchingUser = this.props.allUsers.filter((user) => {
      return user.roomKey === this.props.singleRoom;
    });

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
    const xPossibilities1 = dynamicVals(data, "string", keys);
    const xPossibilities2 = dynamicVals(data, "number", keys);
    const xPossibilities = [...xPossibilities1, ...xPossibilities2];
    const yPossibilities = dynamicVals(data, "number", keys);

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
      suggestions.push("pie");
      // formattedData = ??
    }
    // clean data, create suggestions, reformat data

    const { changeStyle } = this;
    const graphSelected = this.state.graph;
    const dataset = this.props.unformatted.name;

    let graphProperties = {
      ...this.state,
      formattedData: formattedData,
      // pass *download* function here?
    };

    const graphDictionary = {
      bar: <BarGraph {...graphProperties} />,
      line: <LineGraph {...graphProperties} />,
      scatter: <ScatterChart {...graphProperties} />,
      pie: <PieGraph {...graphProperties} />,
    };

    return (
      <div className="selector-box">
        <div className="setting-selectors">
          <h2>{dataset}</h2>
          <div>
            <select
              name="dataId"
              onChange={changeStyle}
              value={this.state.dataId}
            >
              <option value="" disabled selected>
                Data Id
              </option>
              {matchingUserData.map((data, idx) => (
                <option key={idx} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select name="x" onChange={changeStyle} value={this.state.x}>
              <option value="" disabled selected>
                X axis
              </option>
              {xPossibilities.map((key, idx) => (
                <option key={idx} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <div>
              <select name="y" onChange={changeStyle} value={this.state.y}>
                <option value="" disabled selected>
                  Y axis
                </option>
                {yPossibilities.map((key, idx) => (
                  <option key={idx} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="graph"
                onChange={changeStyle}
                value={this.state.graph}
              >
                <option value="" disabled selected>
                  Graph Type
                </option>
                {suggestions.map((suggestion, idx) => (
                  <option key={idx} value={suggestion}>
                    {suggestion}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div id="suggestions-container">
                {this.state.x ? (
                  <div id="suggestions">
                    <h3>
                      Suggested graph types based on your dataset and axis
                      selections:
                    </h3>
                    <ul>
                      {suggestions.map((suggestion, idx) => {
                        return (
                          <li key={idx} style={{ textDecoration: "none" }}>
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
            </div>
            <div className="style-selectors">
              <div>
                <label for="title">
                  Title:
                  <input
                    type="text"
                    placeholder={this.state.title}
                    name="title"
                    onChange={changeStyle}
                    value={this.state.title}
                  />
                </label>
              </div>
              {graphSelected === "pie" ? (
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
                    <label for="xTitle">
                      X Axis:
                      <input
                        type="text"
                        placeholder={this.state.x}
                        name="xTitle"
                        onChange={changeStyle}
                        value={this.state.xTitle}
                      />
                    </label>
                  </div>
                  <div>
                    <label for="yTitle">
                      Y Axis:
                      <input
                        type="text"
                        placeholder={this.state.y}
                        name="yTitle"
                        onChange={changeStyle}
                        value={this.state.yTitle}
                      />
                    </label>
                  </div>
                  <div>
                    <select
                      name="color"
                      onChange={changeStyle}
                      value={this.state.color}
                    >
                      <option value="" disabled selected>
                        Color
                      </option>
                      <option value="#428A51">Forrest Green</option>
                      <option value="#4680C3">Sky Blue</option>
                      <option value="#B80040">Rasberry Hue</option>
                      <option value="#D3B673">Basic Beige</option>
                    </select>
                  </div>
                </div>
              )}
              <div>
                <select
                  name="highlight"
                  onChange={changeStyle}
                  value={this.state.highlight}
                >
                  <option value="" disabled selected>
                    Higlight
                  </option>
                  <option value="#73070B">Crimson Red</option>
                  <option value="#FFCB47">Sunflower Yellow</option>
                  <option value="#FFD2A6">Sherbert Orange</option>
                  <option value="#A2AEBB">Cadet Blue</option>
                </select>
              </div>
            </div>
          </div>
          <div id="graph-container">{graphDictionary[graphSelected]}</div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => this.saveGraph()}
            >
              Save <SaveIcon className="SaveIcon" />
            </Button>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => download(this.state.title)}
          >
            Download <DownloadIcon className="DownloadIcon" />
          </Button>
          <canvas
            id="canvas"
            width="500"
            height="350"
            display="none"
            style={{ visibility: "hidden", zIndex: -950, position: "absolute" }}
          />
        </div>
        <ChatRoom />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    unformatted: state.singleData.unformatted,
    userId: state.auth.id,
    userData: state.data,
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

export default connect(mapState, mapDispatch)(GraphControl);
