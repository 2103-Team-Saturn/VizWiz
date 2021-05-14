import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchSingleData, formatData } from "../../store/singleData";
import { gotGraphs } from "../../store/graph";

class ChartHistory extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.gotGraphs(this.props.userId);
  }

  render() {
    console.log("props", this.props)
    return (
      <div>
        <h1>Charts</h1>
        <div></div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    gotGraphs: () => dispatch(gotGraphs())
  };
};

export default connect(mapState, mapDispatch)(ChartHistory);
