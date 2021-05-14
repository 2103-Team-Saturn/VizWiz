import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleData, formatData } from "../../store/singleData";
import BarGraph from "../graphCharts/BarGraph";
import PieGraph from "../graphCharts/PieGraph";
import LineGraph from "../graphCharts/LineGraph";
import ScatterChart from "../graphCharts/ScatterChart";
import { fetchAllUsers } from "../../store/users";
import { Link } from "react-router-dom";
const io = require("socket.io-client");
const socket = io();

import {
	Grid,
	Typography,
	Button,
	Box,
	makeStyles,
	Container,
	FormControlLabel,
	Checkbox,
	Card,
	CardMedia,
	CardContent,
	FormControl,
} from "@material-ui/core";
import ChatRoom from "../rooms/ChatRoom";

const sampleData = [
	{ quarter: "1", earnings: 13, items: 40, state: "NY" },
	{ quarter: "2", earnings: 16, items: 60, state: "NJ" },
	{ quarter: "3", earnings: 17, items: 70, state: "PA" },
	{ quarter: "4", earnings: 18, items: 80, state: "NY" },
	{ quarter: "4", earnings: 18, items: 81, state: "NY" },
	{ quarter: "4", earnings: 19, items: 90, state: "NY" },
];

class GraphControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			graph: "",
			x: "",
			y: "",
			dataId: "",
		};
		this.leaveRoom = this.leaveRoom.bind(this);
		this.changeStyle = this.changeStyle.bind(this);
		this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
	}

	componentDidMount() {
		this.props.fetchAllUsers();

		socket.emit("joinRoom", this.props.singleRoom, this.props.user);

		socket.on("receiveCode", (payload) => {
			this.updateCodeFromSockets(payload);
		});
	}

	leaveRoom() {
		socket.emit("leaveRoom", this.props.singleRoom, this.props.user);
	}

	updateCodeFromSockets(payload) {
		console.log("PAYLOAD", payload);
		let attribute = Object.keys(payload)[0];
		let updated = Object.values(payload)[0];
		let user = Object.values(payload)[1];
		this.changeStyle(updated, attribute, "sockets");
	}

	changeStyle(e, attribute, source, user) {
		let updated;
		if (e && e.target) {
			updated = { value: e.target.value, user: this.props.user.username };
		} else {
			updated = { value: e, user: this.props.user.username };
		}

		if (e && e.target) {
			attribute = e.target.name;
		}

		switch (attribute) {
			case "graph":
				this.setState({
					[attribute]: updated.value,
					userThatMadeChanges: updated.user,
					x: "",
					y: "",
				});
				break;
			case "x":
				this.setState({
					[attribute]: updated.value,
					userThatMadeChanges: updated.user,
					graph: this.state.graph,
					y: this.state.y,
				});
				break;
			case "y":
				this.setState({
					[attribute]: updated.value,
					userThatMadeChanges: updated.user,
					graph: this.state.graph,
					x: this.state.x,
				});
				break;
			case "dataId":
				console.log("UPDATED", updated);
				this.setState({
					[attribute]: +updated.value,
					userThatMadeChanges: updated.user,
					graph: "",
					x: "",
					y: "",
				});
				break;
			default:
				this.setState({
					[attribute]: updated.value,
					userThatMadeChanges: updated.user,
				});
		}

		let change = {
			[attribute]: updated.value,
			userThatMadeChanges: updated.user,
		};

		if (!source) {
			socket.emit("newChanges", this.props.singleRoom, change);
		}
	}

	render() {
		console.log(this.props);

		const matchingUser = this.props.allUsers.filter((user) => {
			return user.roomKey === this.props.singleRoom;
		});

		const matchingUserData = matchingUser[0].data;

		const correctData = matchingUserData.filter(
			(dataSet) => dataSet.id === this.state.dataId
		);

		console.log("CORRECT DATA", correctData);
		let data;

		{
			correctData.length ? (data = correctData[0].values) : (data = sampleData);
		}

		console.log("DATA", data);
		// const dataSet = this.props.userData.filter((dataSet) => {
		// 	return dataSet.id === this.props.dataId;
		// });

		// const data = dataSet[0].values || [];

		const firstLine = data[0] || {};

		const keys = Object.keys(firstLine);

		// let obj = {};

		// for (let i = 0; i < keys.length; i++) {
		// 	let currentKey = keys[i];
		// 	obj[currentKey] = [];
		// 	data.map((item) => obj[currentKey].push(item[currentKey]));
		// }

		// // x axis tends to be strings, in line/scatter, but x can also be numbers,
		// // y axis needs to be numbers, **pie charts don't operate on axis
		const dynamicVals = (data, type) => {
			return keys.filter((key) => typeof data[0][key] === type);
		};

		let xPossibilities = [];
		if (
			this.state.graph === "bar" ||
			this.state.graph === "pie" ||
			this.state.graph === "line"
		) {
			xPossibilities = dynamicVals(data, "string");
		} else if (this.state.graph === "scatter") {
			xPossibilities = dynamicVals(data, "number");
		}

		const yPossibilities = dynamicVals(data, "number");

		// console.log("DYNAMICVALUES", dynamicVals(data, "number" || "string"));

		// console.log("X>>>", xPossibilities);
		// console.log("Y>>>", yPossibilities);

		const graphSelected = this.state.graph;
		const x = this.state.x;
		const y = this.state.y;
		const dataset = this.props.unformattedData.name;

		const graphs = {
			bar: <BarGraph data={data} dataset={dataset} x={x} y={y} />,
			line: <LineGraph data={data} dataset={dataset} x={x} y={y} />,
			scatter: <ScatterChart data={data} dataset={dataset} x={x} y={y} />,
			pie: <PieGraph data={data} dataset={dataset} x={x} y={y} />,
		};

		console.log("STATE", this.state);
		return (
			<div>
				<h2>{dataset}</h2>
				<div>
					<select
						name='dataId'
						onChange={this.changeStyle}
						value={this.state.dataId}>
						<option value='' disabled selected>
							Data Id
						</option>
						{matchingUserData.map((data, idx) => (
							<option key={idx} value={data.id}>
								{data.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<select
						name='graph'
						onChange={this.changeStyle}
						value={this.state.graph}>
						<option value='' disabled selected>
							Graph Type
						</option>
						<option value='bar'>Bar</option>
						<option value='pie'>Pie</option>
						<option value='line'>Line</option>
						<option value='scatter'>Scatter</option>
					</select>
				</div>
				<div>
					<select name='x' onChange={this.changeStyle} value={this.state.x}>
						<option value='' disabled selected>
							X axis
						</option>
						{keys.map((key, idx) => (
							<option key={idx} value={key}>
								{key}
							</option>
						))}
					</select>
					<div>
						<select name='y' onChange={this.changeStyle} value={this.state.y}>
							<option value='' disabled selected>
								Y axis
							</option>
							{yPossibilities.map((key, idx) => (
								<option key={idx} value={key}>
									{key}
								</option>
							))}
						</select>
					</div>
					<div id='graph-container'>{graphs[graphSelected]}</div>
				</div>
				<div>
					<ChatRoom />
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		formattedData: state.singleData.formatted,
		unformattedData: state.singleData.unformatted,
		userId: state.auth.id,
		user: state.auth,
		userData: state.data,
		rooms: state.rooms.allRooms,
		singleRoom: state.rooms.singleRoom,
		allUsers: state.users,
		dataId: state.singleData.dataId,
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchSingleData: (userId, dataId) =>
			dispatch(fetchSingleData(userId, dataId)),
		fetchAllUsers: () => dispatch(fetchAllUsers()),
	};
};

export default connect(mapState, mapDispatch)(GraphControl);
