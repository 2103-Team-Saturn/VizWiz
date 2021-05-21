const axios = require("axios");

const SET_DATA = "SET_DATA";
const ADD_DATA = "ADD_DATA";
const DATA_LOADING = "DATA_LOADING";
const DATA_LOADING_SUCCESS = "DATA_LOADING_SUCCESS";

const _fetchData = (data) => ({
	type: SET_DATA,
	data,
});

const _addData = (data) => ({
	type: ADD_DATA,
	data,
});

const dataLoading = () => ({
	type: DATA_LOADING,
});

const dataLoadingSuccess = () => ({
	type: DATA_LOADING_SUCCESS,
});

export const fetchData = (userId) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/users/${userId}/data`);
		dispatch(_fetchData(data));
	};
};

export const addData = (userId, values, name) => {
	try {
		return async (dispatch) => {
			await dispatch(dataLoading());
			const { data: created } = await axios.post(`/api/users/${userId}/data`, {
				values,
				userId,
				name,
			});
			dispatch(_addData(created));
			dispatch(dataLoadingSuccess());
		};
	} catch (error) {
		console.log(error);
	}
};

const initialState = {
	data: [],
	loading: false,
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case SET_DATA:
			return { ...state, data: action.data };
		case ADD_DATA:
			return { ...state, data: [...state.data, action.data] };
		case DATA_LOADING:
			return { ...state, loading: true };
		case DATA_LOADING_SUCCESS:
			return { ...state, loading: false };
		default:
			return state;
	}
}
