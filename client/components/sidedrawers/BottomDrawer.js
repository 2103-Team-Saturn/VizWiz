import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatIcon from '@material-ui/icons/Chat';
import { IconButton, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  icon: {
    border: 'solid',
  },
}));

export default function BottomDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          className={classes.icon}
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          // id="panel1a-header"
        >
          <IconButton>
            <ChatIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
