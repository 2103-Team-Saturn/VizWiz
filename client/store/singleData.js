const axios = require('axios');

const SET_SINGLE_DATA = 'SET_SINGLE_DATA';
const FORMAT_DATA = 'FORMAT_DATA';

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

export const fetchSingleData = (userId, dataId) => {
  return async (dispatch) => {
    console.log(userId, dataId);
    const { data } = await axios.get(`/api/users/${userId}/data/${dataId}`);
    dispatch(_fetchSingleData(data));
  };
};

// export const fetchFormatData = (userId, dataId) => {
// 	return async (dispatch) => {
// 		const {data} = await axios.get(``)
// 	}
// }

const initialState = {
  unformatted: {},
  formatted: {},
};

export default function singleDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_DATA:
      return { ...state, unformatted: action.data };
    case FORMAT_DATA:
      return { ...state, formatted: action.data };
    default:
      return state;
  }
}
