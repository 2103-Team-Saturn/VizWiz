import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/data";
import { Link } from "react-router-dom";

class ViewData extends Component {
	componentDidMount() {
		this.props.fetchData(this.props.userId);
	}
	render() {
		console.log(this.props.data);
		return (
			<div>
				<ul>
					{this.props.data.map((item) => (
						<li key={item.id}>
							<Link to={`/users/${this.props.userId}/data/${item.id}`}>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data.data,
	userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
	fetchData: (userId) => dispatch(fetchData(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewData);
