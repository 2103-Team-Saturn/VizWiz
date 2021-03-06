import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import dataReducer from "./data";
import singleDataReducer from "./singleData";

import roomReducer from "./room";
import userReducer from "./users";

import graphReducer from "./graph"


const reducer = combineReducers({
	auth,
	data: dataReducer,
	singleData: singleDataReducer,

	rooms: roomReducer,
	users: userReducer,

	graphs: graphReducer

});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
