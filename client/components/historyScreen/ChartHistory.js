import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { gotGraphs, deletingGraph } from "../../store/graph";
import { Grid, Paper, Container, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { CallMissedSharp, CenterFocusStrong } from "@material-ui/icons";
import { fetchAllUsers } from "../../store/users";

class ChartHistory extends Component {
  constructor() {
    super();
    this.deleteGraph = this.deleteGraph.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
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
          <h1
            id="HistoryTitle"
            style={{
              borderRadius: 3,
              fontSize: 40,
              border: 0,
              color: "black",
              height: 48,
              padding: 30,
              textAlign: "center",
            }}
          >
            Graph Dashboard
          </h1>
          <Grid container spacing={10}>
            {this.props.userGraph.map((graph) => (
              <Grid
                key={graph.id}
                item
                xs={12}
                s={6}
                md={4}
                lg={3}
                style={{
                  textAlign: "center",
                  backgroundColor: "steelblue",
                  margin: 30,
                  border: 10,
                  borderRadius: 12,
                }}
              >
                <Link
                  to={{
                    pathname: `/users/${graph.userId}/data/${graph.datumId}/${graph.id}`,
                    state: {
                      graph,
                    },
                  }}
                >
                  <h1>{graph.properties.title}</h1>
                </Link>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => this.deleteGraph(graph)}
                >
                  Delete <DeleteIcon />
                </Button>
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
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(ChartHistory);
