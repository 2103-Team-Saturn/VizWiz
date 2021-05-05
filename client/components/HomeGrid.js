import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button, Typography, Paper, Grid } from '@material-ui/core';

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

  const handleOnClick = () => {
    console.log('Clicked!');
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item>
          <Typography variant="body2" style={{ cursor: 'pointer' }}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={handleOnClick}
            >
              Import Data
            </Button>
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}
