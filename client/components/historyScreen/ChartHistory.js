import React, { Component } from 'react';
import { connect } from "react-redux";
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
        {this.props.userGraph.map(graph =>
          <div key={graph.id}>
            <h1>{graph.properties.title}</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    userGraph: state.graphs
  };
};

const mapDispatch = (dispatch) => {
  return {
    gotGraphs: (id) => dispatch(gotGraphs(id))
  };
};

export default connect(mapState, mapDispatch)(ChartHistory);
