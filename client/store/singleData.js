const axios = require("axios");

const SET_SINGLE_DATA = "SET_SINGLE_DATA";
const FORMAT_DATA = "FORMAT_DATA";
const SAVE_DATA_ID = "SAVE_DATA_ID";

const _fetchSingleData = (data) => {
	return {
		type: SET_SINGLE_DATA,
		data,
	};
};

export const formatData = (data) => {
	return {
		type: FORMAT_DATA,
		data,
	};
};

export const saveDataId = (id) => {
	return {
		type: SAVE_DATA_ID,
		id,
	};
};

export const fetchSingleData = (userId, dataId) => {
	return async (dispatch) => {
		console.log(userId, dataId);
		const { data } = await axios.get(`/api/users/${userId}/data/${dataId}`);
		dispatch(_fetchSingleData(data));
	};
};

const initialState = {
	unformatted: {},
	formatted: {},
	dataId: 0,
};

export default function singleDataReducer(state = initialState, action) {
	switch (action.type) {
		case SET_SINGLE_DATA:
			return { ...state, unformatted: action.data };
		case FORMAT_DATA:
			return { ...state, formatted: action.data };
		case SAVE_DATA_ID:
			return { ...state, dataId: action.id };
		default:
			return state;
	}
}
