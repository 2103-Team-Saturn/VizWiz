import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../store/data';
import { Link as RouterLink } from 'react-router-dom';
import { saveDataId } from '../../store/singleData';

import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Container,
  Card,
  Link,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 130,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0',
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    width: 150,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
}));

const DataDash = (props) => {
  useEffect(() => {
    props.getUserData(props.userId);
  }, []);

  const classes = useStyles();

  const { userId, data } = props;

  console.log('*DD props>>>', props.data);

  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h3">Your Data Sets:</Typography>
      </Box>
      {data.length > 0 ? (
        <Box mt={3}>
          <Grid container spacing={2}>
            {data.map((dataset) => (
              <Grid item key={dataset.id} xs={12} md={6} lg={4}>
                <Card className={classes.cardRoot}>
                  <button
                    onClick={() => {
                      props.setDataId(dataset.id);
                      props.history.push('/room');
                    }}
                  >
                    <Typography variant="h5">{dataset.name}</Typography>
                  </button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <div>
          <h4>Looks like you still need to upload some data sets.</h4>
          <Button to={`/home`} component={RouterLink} variant="contained">
            Go to Upload
          </Button>
        </div>
      )}
    </Container>
  );
};

const mapState = (state) => ({
  data: state.data.data,
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  getUserData: (userId) => dispatch(fetchData(userId)),
  setDataId: (dataId) => dispatch(saveDataId(dataId)),
});

export default connect(mapState, mapDispatch)(DataDash);
