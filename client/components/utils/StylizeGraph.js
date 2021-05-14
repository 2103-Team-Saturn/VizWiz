import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BarGraph,
  LineGraph,
  PieGraph,
  ScatterChart,
} from '../graphCharts/index'; //should be index??

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
} from '@material-ui/core';
class StylizeGraph extends Component {
  constructor(props) {
    super(props);
    //expecting props of graphSelected, x(axis key), y(axis key)
    console.log(
      'style component constructor props>>>',
      this.props.location.state
    );
    this.state = {
      title: this.props.unformatted.name,
      xTitle:  '',
      yTitle:  '',
      xAxis: this.props.location.state.xValues, // hold all values in array corresponding to user selected key
      yAxis: this.props.location.state.yValues,
      color: '',
      highlight: '',
    };
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  render() {
    const { graph, x, y, xValues, yValues } = this.props.location.state;
    /* 1.  ^ coming from 'next' button inside graphControl with :
            <Link to={{
                pathname: '/users/:id/data/:dataId/edit',
                state: {
                    graph: this.state.graph,
                    x: this.state.x,
                    y: this.state.y,
                }
                }}>
                2. create route in routes index that will display component: StylizeGraph
    */
    // move following function to a separate utils folder??
    // go through the data arrays to clean up null/undefined data points for Victory

    const formatForVictory = (xVals, yVals) => {
      const result = [];
      let i = 0;
      while (i < Math.max(xVals.length, yVals.length)) {
        if (xVals[i] && yVals[i]) {
          // if not null or undefined
          result.push({ x: xVals[i], y: yVals[i] });
          i++;
        } else {
          i++;
          continue;
        }
      }
      return result;
    };
    // data will be cleaned up on following line:
    const data = formatForVictory(xValues, yValues);
    console.log('style graph data >>>', data);

    // create a props object for each graph type to take that will have all logistics and style
    let graphProperties = {
      graph: graph,
      data: data,
      xKey: x,
      yKey: y,
      // for form...
      title: this.state.title,
      xAxisTitle: this.state.xTitle,
      yAxisTitle: this.state.yTitle,
      xVals: this.state.xVals,
      yVals: this.state.yVals,
      color: this.state.color,
      highlight: this.state.highlight,
    };
    const graphDictionary = {
      bar: <BarGraph {...graphProperties} />,
      line: <LineGraph {...graphProperties} />,
      scatter: <ScatterChart {...graphProperties} />,
      pie: <PieGraph {...graphProperties} />,
    };

    return (
      <div>
        form goes here
      </div>
    );
    //build out editing form, and graph rendering div here
  }
}
const mapState = (state) => ({
  dataId: state.singleData.dataId,
  unformatted: state.singleData.unformatted,
  formatted: state.singleData.formatted,
});
const mapDispatch = (dispatch) => {
  return {
    // graph saving dispatches will go in here
  };
};
export default connect(mapState, mapDispatch)(StylizeGraph);
