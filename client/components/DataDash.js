import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/data";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Container,
  Card,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem 0",
  },
  cardRoot: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: 150,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
}));

const DataDash = (props) => {
  
  useEffect( () => {
      props.getUserData(props.userId)
  }, [] );

    const classes = useStyles();

    const { userId, data } = props;

    console.log('*DD props>>>', props.data);

    return (
        <Container>
          <Box className={classes.header}>
            <Typography variant="h3">Your Data Sets:</Typography>
          </Box>
          <Box mt={3}>
            <Grid container spacing={2}>
              {data.map((dataset) => (
                <Grid item key={dataset.id} xs={12} md={6} lg={4}>
                  <Card className={classes.cardRoot}>
                    <Link
                      to={`/users/${userId}/data/${dataset.id}`}
                      component={RouterLink}
                    >
                      <Typography variant="h5">{dataset.name}</Typography>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
    );
}

const mapState = (state) => ({
  data: state.data,
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  getUserData: (userId) => dispatch(fetchData(userId)),
});

export default connect(mapState, mapDispatch)(DataDash);
