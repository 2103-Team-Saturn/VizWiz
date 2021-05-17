import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/home/home";
import { me } from "./store";

import ChartHistory from "./components/historyScreen/ChartHistory";

import DataDash from "./components/dataScreen/DataDash";
import GraphControl from "./components/utils/GraphControl";
import StylizeGraph from "./components/utils/StylizeGraph";
import RoomForm from "./components/rooms/RoomForm";
import ChatRoom from "./components/rooms/ChatRoom";

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn, hasRoom } = this.props;

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route exact path='/home' component={Home} />
						<Route exact path='/users/:userId/data' component={DataDash} />
						<Route
							exact
							path='/users/:id/data/:dataId'
							component={GraphControl}
						/>
						<Route path='/users/:userId/history' component={ChartHistory} />
						<Route
							exact
							path='/room'
							render={(routeProps) => <RoomForm {...routeProps} />}
						/>
						<Route
							exact
							path='/room/live'
							render={(props) =>
								hasRoom ? <GraphControl {...props} /> : <Redirect to='/room' />
							}
						/>
						<Redirect to='/home' />
					</Switch>
				) : (
					<Switch>
						<Route path='/' exact component={Login} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={Signup} />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
		hasRoom: !!state.rooms.singleRoom,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
