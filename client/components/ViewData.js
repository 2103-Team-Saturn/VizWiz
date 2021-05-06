import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/data";

class ViewData extends Component {
	componentDidMount() {
		this.props.fetchData(this.props.userId);
	}
	render() {
		const first = this.props.data[0] || {};
		const values = first.values || [];
		console.log(values.map((item) => item.Day));
		return <div>Hello World</div>;
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
