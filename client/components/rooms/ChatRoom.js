import React, { Component } from 'react';
const io = require('socket.io-client');
const socket = io();
import { connect } from 'react-redux';

import { IconButton, Tooltip } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

// import './chatRoom.css';

class ChatRoom extends Component {
  constructor() {
    super();

    this.state = {
      messageInput: '',
      messages: [],
      chat: true,
    };

    this.typeMessage = this.typeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  componentDidMount() {
    socket.emit('joinRoom', this.props.singleRoom, this.props.user);

    socket.on('receiveMessage', (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  typeMessage(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  componentDidUpdate() {
    if (this.state.chat) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const user = this.props.user.username;

    const newMessage = this.state.messageInput;

    if (newMessage) {
      const message = {
        user,
        newMessage,
      };

      this.setState({
        messages: [...this.state.messages, message],
        messageInput: '',
      });

      socket.emit('newMessages', this.props.singleRoom, message);
    }
  }

  leaveRoom() {
    socket.emit('leaveRoom', this.props.singleRoom, this.props.user);
    this.props.history.push('/home');
  }

  render() {
    const chatMessages = this.state.messages;
    console.log(this.props);
    return (
      <div>
        {/* message rendering box */}
        <div className="messagesContainer">
          {chatMessages.map((message, index) => {
            const user = message.user;
            const incomingMessage = message.newMessage;
            return (
              <div key={index}>
                <p>
                  {user}:{incomingMessage}
                </p>
              </div>
            );
          })}
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />
        </div>

        {/* message input box */}
        <div className="messageInputBox">
          <form onSubmit={this.handleSubmit}>
            <input
              className="messageInput"
              name="messageInput"
              type="text"
              placeholder="Type a message..."
              value={this.state.messageInput}
              onChange={this.typeMessage}
            />
            <Tooltip title="Send" placement="top" arrow>
              <IconButton className="sendButton" color="primary" type="submit">
                <SendRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Leave Room" placement="top" arrow>
              <IconButton
                className="leaveButton"
                color="secondary"
                onClick={() => this.leaveRoom()}
              >
                <MeetingRoomIcon />
              </IconButton>
            </Tooltip>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    user: state.auth,
    userData: state.data.data,
    rooms: state.rooms.allRooms,
    singleRoom: state.rooms.singleRoom,
    allUsers: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(ChatRoom);
