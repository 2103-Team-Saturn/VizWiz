import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid } from '@material-ui/core';
import FileUpload from './FileUpload';
import ModalButton from './ModalButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 200,
  },
  image: {
    width: 128,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function HomeGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item>
          <Typography variant="body2" style={{ cursor: 'pointer' }}>
            <ModalButton />
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}
