import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleData, formatData } from "../../store/singleData";
import BarGraph from "../graphCharts/BarGraph";
import PieGraph from "../graphCharts/PieGraph";
import LineGraph from "../graphCharts/LineGraph";
import ScatterChart from "../graphCharts/ScatterChart";

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
	Link,
} from "@material-ui/core";

class GraphControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			graph: "",
			x: "",
			y: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props.fetchSingleData(
			this.props.userId,
			this.props.match.params.dataId
		);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	render() {
		const data = this.props.unformattedData.values || [];
		// console.log('**DATA>>>', data);
		// console.log('**GC props>>>', this.props);

		const firstLine = data[0] || {};

		const keys = Object.keys(firstLine);

		let obj = {};

		for (let i = 0; i < keys.length; i++) {
			let currentKey = keys[i];
			obj[currentKey] = [];
			data.map((item) => obj[currentKey].push(item[currentKey]));
		}

		// x axis tends to be strings, in line/scatter, but x can also be numbers,
		// y axis needs to be numbers, **pie charts don't operate on axis
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

		// console.log(dynamicVals(data, "number" || "string"));

		console.log("X>>>", xPossibilities);
		// console.log("Y>>>", yPossibilities);

		const { handleChange } = this;
		const graphSelected = this.state.graph;
		const x = this.state.x;
		const y = this.state.y;
		const dataset = this.props.unformattedData.name;

		return (
			<div>
				<h2>{dataset}</h2>
				<div>
					<select name='graph' onChange={handleChange} value={this.state.graph}>
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
					<select name='x' onChange={handleChange} value={this.state.x}>
						<option value='' disabled selected>
							X axis
						</option>
						{xPossibilities.map((key, idx) => (
							<option key={idx} value={key}>
								{key}
							</option>
						))}
					</select>
					<div>
						<select name='y' onChange={handleChange} value={this.state.y}>
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
					<div id='graph-container'>
						{graphSelected === "bar" ? (
							<BarGraph data={data} dataset={dataset} x={x} y={y} />
						) : graphSelected === "line" ? (
							<LineGraph data={data} dataset={dataset} x={x} y={y} />
						) : graphSelected === "scatter" ? (
							<ScatterChart data={data} dataset={dataset} x={x} y={y} />
						) : graphSelected === "pie" ? (
							<PieGraph data={data} dataset={dataset} x={x} y={y} />
						) : (
							""
						)}
					</div>
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
		userData: state.data,
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchSingleData: (userId, dataId) =>
			dispatch(fetchSingleData(userId, dataId)),
	};
};

export default connect(mapState, mapDispatch)(GraphControl);
