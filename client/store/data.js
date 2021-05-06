const axios = require('axios');

const SET_DATA = 'SET_DATA';
const ADD_DATA = 'ADD_DATA';

const _fetchData = (data) => ({
  type: SET_DATA,
  data,
});

const _addData = (data) => ({
  type: ADD_DATA,
  data,
});

export const fetchData = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/users/${userId}/data`);
    dispatch(_fetchData(data));
  };
};

export const addData = (userId, values) => {
  try {
    return async (dispatch) => {
      const { data: created } = await axios.post(`/api/users/${userId}/data`, {
        values,
        userId,
      });
      console.log('created >>>', created);
      dispatch(_addData(created));
    };
  } catch (error) {
    console.log(error);
  }
};

const initialState = [];

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return action.data;
    case ADD_DATA:
      return [...state, action.data];
    default:
      return state;
  }
}
