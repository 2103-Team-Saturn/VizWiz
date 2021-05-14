import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleData, formatData } from "../../store/singleData";
import {
  LineGraph,
  BarGraph,
  PieGraph,
  ScatterChart,
} from "../graphCharts/index";

import {
  Grid,
  Typography,
  Button,
  Box,
  makeStyles,
  Container,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
  FormControl,
} from "@material-ui/core";

import { graphSuggestor } from "./graphSuggestor";
import { formatForVictory } from "./formatForVictory";

class GraphControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataset: "", // Isabelle's dataset selection logic??
      graph: "",
      x: "",
      y: "",
      title: this.props.unformatted.name,
      xTitle: "",
      yTitle: "",
      // xAxis: this.props.location.state.xValues, // hold all values in array corresponding to user selected key
      // yAxis: this.props.location.state.yValues,
      color: "",
      highlight: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleData(
      this.props.userId,
      this.props.match.params.dataId
    );
  }

  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const data = this.props.unformatted.values || [];

    const firstLine = data[0] || {};

    const keys = Object.keys(firstLine);

    let obj = {};

    for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i];
      obj[currentKey] = [];
      data.map((item) => obj[currentKey].push(item[currentKey]));
    }
    console.log("graph control obj >>>", obj);

    const dynamicVals = (data, type) => {
      return keys.filter((key) => typeof data[0][key] === type);
    };

    // populating what can go in x/y axis select dropdowns
    const xPossibilities1 = dynamicVals(data, "string");
    const xPossibilities2 = dynamicVals(data, "number");
    const xPossibilities = [...xPossibilities1, ...xPossibilities2];
    const yPossibilities = dynamicVals(data, "number");
    //-------------------------------------------
    // run logics to suggest graph types for users
    let xValues;
    let yValues;
    let suggestions = [];
    let formattedData = [];

    // making the suggestions array, and mapping through axis selections
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
      console.log("graph control x >>>", xValues);
      console.log("graph control y >>>", yValues);
      suggestions = graphSuggestor(xValues, yValues, this.state.x);
      // data will be cleaned up on following line:
      formattedData = formatForVictory(xValues, yValues);
    } else if (this.state.x) {
      suggestions.push("pie");
      // formattedData = ??
    }

    //-------------------------------------------
    console.log("suggestions >>>", suggestions);
    console.log("formatted data>>>", formattedData);

    const { handleChange } = this;
    const graphSelected = this.state.graph;
    // const x = this.state.x;
    // const y = this.state.y;
    const dataset = this.props.unformatted.name;

    // // data will be cleaned up on following line:
    // const formattedData = formatForVictory(xValues, yValues);

    let graphProperties = {
      ...this.state,
      formattedData: formattedData,
      // methods needed for components can go in here as needed??
    };

    console.log('graphProperties>>>', graphProperties);

    const graphDictionary = {
      bar: <BarGraph {...graphProperties} />,
      line: <LineGraph {...graphProperties} />,
      scatter: <ScatterChart {...graphProperties} />,
      pie: <PieGraph {...graphProperties} />,
    };

    // original graphs dictionary
    // const graphs = {
    //   bar: <BarGraph data={data} dataset={dataset} x={x} y={y} />,
    //   line: <LineGraph data={data} dataset={dataset} x={x} y={y} />,
    //   scatter: <ScatterChart data={data} dataset={dataset} x={x} y={y} />,
    //   pie: <PieGraph data={data} dataset={dataset} x={x} y={y} />,
    // };

    return (
      <div className="selector-box">
        <div className="setting-selectors">
          <h2>{dataset}</h2>
          {/* build out dataset select dropdown for Isabelle here? */}
          <div>
            <select name="x" onChange={handleChange} value={this.state.x}>
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
              <select name="y" onChange={handleChange} value={this.state.y}>
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
                onChange={handleChange}
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
                <label for="title">Title: 
                <input
                  type="text"
                  placeholder={this.state.title}
                  name="title"
                  onChange={handleChange}
                  value={this.state.title}
                />
                </label>
              </div>
              <div>
                <label for="xTitle">X Axis: 
                <input
                  type="text"
                  placeholder={this.state.x}
                  name="xTitle"
                  onChange={handleChange}
                  value={this.state.xTitle}
                />
                </label>
              </div>
              <div>
                <label for="yTitle" >Y Axis:
                <input
                type="text"
                placeholder={this.state.y}
                  name="yTitle"
                  onChange={handleChange}
                  value={this.state.yTitle}
                />
                </label>
              </div>
              <div>
                <select
                  name="color"
                  onChange={handleChange}
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
              <div>
                <select
                  name="highlight"
                  onChange={handleChange}
                  value={this.state.highlight}
                >
                  <option value="" disabled selected>
                    Higlight
                  </option>
                  <option value="#73070B">Crimson Red</option>
                  <option value="#FFCB47">Sunflower Yellow</option>
                  <option value="#A2AEBB">Sherbert Orange</option>
                  <option value="#A2AEBB">Cadet Blue</option>
                </select>
              </div>
            </div>
          </div>

          <div id="graph-container">{graphDictionary[graphSelected]}</div>
          {/* <div className="nextBtn">
            <Button>
              <Link
                // onClick={async () => {
                //   await this.props.formatData(obj);
                // }}
                to={{
                  pathname: `/users/${this.props.userId}/data/${this.props.match.params.dataId}/style`,
                  state: {
                    graph: this.state.graph,
                    x: this.state.x,
                    y: this.state.y,
                    xValues: xValues,
                    yValues: yValues,
                  },
                }}
              >
                Next
              </Link>
            </Button>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // formattedData: state.singleData.formatted,
    unformatted: state.singleData.unformatted,
    userId: state.auth.id,
    userData: state.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleData: (userId, dataId) =>
      dispatch(fetchSingleData(userId, dataId)),
    // formatData: (data) => dispatch(formatData(data)),
  };
};

export default connect(mapState, mapDispatch)(GraphControl);
