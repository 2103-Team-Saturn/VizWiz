import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chatDrawer.css';
import ChatRoom from '../rooms/ChatRoom';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import { axisRight } from 'd3-axis';

export function ChatDrawer(props) {
  const Styles = {
    width: 'auto',
    position: 'fixed',
    bottom: '0px',
  };

  return (
    <div className="my-footer" style={Styles}>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              className="chat-widget"
              variant="link"
              eventKey="0"
            >
              <IconButton color="primary">
                <ChatIcon />
              </IconButton>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ChatRoom />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
