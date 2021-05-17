import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { gotGraphs, deletingGraph } from "../../store/graph";
import { Grid, Paper, Container } from "@material-ui/core";

class ChartHistory extends Component {
  constructor() {
    super();
    this.deleteGraph = this.deleteGraph.bind(this);
  }

  componentDidMount() {
    this.props.gotGraphs(this.props.userId);
  }

  deleteGraph(graph) {
    this.props.deletingGraph(graph);
  }

  render() {
    console.log("props", this.props);
    return (
      <div>
        <Container>
        <h1>Charts</h1>
        <Grid container spacing={10}>
        {this.props.userGraph.map((graph) => (
          <Grid key={graph.id} item xs={12} s={6} md={4} lg={3}>
            <Link
              to={{
                pathname: `/users/${graph.userId}/data/${graph.datumId}`,
                state: {
                  graph,
                },
              }}
            >
              <h1>{graph.properties.title}</h1>
            </Link>
            <button onClick={() => this.deleteGraph(graph)}>Delete</button>
          </Grid>
        ))}
        </Grid>
        </Container>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    userGraph: state.graphs,
  };
};

const mapDispatch = (dispatch) => {
  return {
    gotGraphs: (id) => dispatch(gotGraphs(id)),
    deletingGraph: (id) => dispatch(deletingGraph(id)),
  };
};

export default connect(mapState, mapDispatch)(ChartHistory);
