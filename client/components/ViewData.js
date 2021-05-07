import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/data";
import lodash from "lodash";

class ViewData extends Component {
	componentDidMount() {
		this.props.fetchData(this.props.userId);
	}
	render() {
		const data = this.props.data || [];

		const first = data[0] || {};

		const firstValues = first.values || {};

		const firstOne = firstValues[0] || {};
		const keys = Object.keys(firstOne);

		let obj = {};
		console.log("NOT SORTED", firstValues);

		for (let i = 0; i < keys.length; i++) {
			let currentKey = keys[i];
			obj[currentKey] = [];
			firstValues.map((item) => obj[currentKey].push(item[currentKey]));
		}

		console.log("SORTED", obj);

		return (
			<div>
				<ul>
					{this.props.data.map((item) => (
						<li key={item.id}>{item.name}</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data,
	userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
	fetchData: (userId) => dispatch(fetchData(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewData);
