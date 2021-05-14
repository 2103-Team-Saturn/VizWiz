import axios from "axios";
import history from "../history";

const GET_ALL_USERS = "GET_ALL_USERS";

const getAllUsers = (users) => ({
	type: GET_ALL_USERS,
	users,
});

export const fetchAllUsers = () => {
	return async (dispatch) => {
		const { data: users } = await axios.get(`/api/users`);
		dispatch(getAllUsers(users));
	};
};

const initialState = [];

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_USERS:
			return action.users;
		default:
			return state;
	}
}
