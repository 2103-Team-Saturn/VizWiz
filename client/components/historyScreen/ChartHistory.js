import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { gotGraphs, deletingGraph } from "../../store/graph";
import { Grid, Paper, Container, Button, Image } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { CallMissedSharp, CenterFocusStrong } from "@material-ui/icons";
import { fetchAllUsers } from "../../store/users";
import { saveImg } from "../utils";

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
    return (
      <div style={{ marginTop: 150 }}>
        <Container>
          <h1
            id="HistoryTitle"
            style={{
              borderRadius: 3,
              fontSize: 40,
              border: 0,
              color: "black",
              height: 48,
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
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  backgroundColor: "lightgrey",
                  margin: 30,
                  border: 10,
                  borderRadius: 12,
                  alignItems: "center",
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
                  <h1
                    style={{
                      color: "black",
                    }}
                  >
                    {graph.properties.title}
                  </h1>

                  <div
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "50",
                    }}
                  >
                    <img
                      src={graph.properties.img}
                      alt="Graph"
                      width="300"
                      height="300"
                    />
                  </div>
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
