import React, { Component } from "react";
import { connect } from "react-redux";
import { gotSingleRoom } from "../../store/room";
import { fetchAllUsers } from "../../store/users";

class RoomForm extends Component {
	constructor() {
		super();
		this.state = {
			roomKey: "",
		};

		this.userRoomSubmit = this.userRoomSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchAllUsers();
	}

	userRoomSubmit(userKey) {
		event.preventDefault();
		let roomKey = userKey;
		const users = this.props.allUsers;
		const match = users.filter((currentUser) => {
			return currentUser.roomKey === roomKey;
		});
		if (match.length) {
			this.props.fetchSingleRoom(roomKey);
			this.props.history.push("room/live");
		} else {
			console.log("INVALID KEY");
		}
	}

	handleChange(event) {
		this.setState({ roomKey: event.target.value });
	}

	handleSubmit(userKey) {
		event.preventDefault();
		let roomKey = userKey;
		const users = this.props.allUsers;
		const match = users.filter((currentUser) => {
			return currentUser.roomKey === roomKey;
		});
		if (match.length) {
			this.props.fetchSingleRoom(roomKey);
			this.props.history.push("room/live");
		} else {
			console.log("INVALID KEY");
		}
	}

	render() {
		const userKey = this.props.user.roomKey;

		return (
			<div>
				<form>
					<label htmlFor='user-key'>Your Room ID:</label>
					<input name='user-key' onChange={this.handleChange} value={userKey} />
					<button onClick={() => this.userRoomSubmit(userKey)}>
						Enter Your Room
					</button>
				</form>
				<form>
					<label htmlFor='room-key'>Enter Room ID Here:</label>
					<input
						name='room-key'
						onChange={this.handleChange}
						value={this.state.roomKey}
					/>
					<button onClick={() => this.handleSubmit(this.state.roomKey)}>
						Enter Another Room
					</button>
				</form>
			</div>
		);
	}
}

const mapState = (state) => ({
	data: state.singleData.unformatted,
	user: state.auth,
	allUsers: state.users,
	rooms: state.rooms.allRooms,
	singleRoom: state.rooms.singleRoom,
});

const mapDispatch = (dispatch) => ({
	fetchAllUsers: () => dispatch(fetchAllUsers()),
	fetchSingleRoom: (roomKey) => dispatch(gotSingleRoom(roomKey)),
});

export default connect(mapState, mapDispatch)(RoomForm);
