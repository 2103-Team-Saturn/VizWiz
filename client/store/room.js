import axios from "axios";
import history from "../history";

const ADD_ROOM = "ADD_ROOM";
const GOT_ROOMS = "GOT_ROOMS";
const GOT_SINGLE_ROOM = "GOT_SINGLE_ROOM";

const _addRoom = (room) => ({
	type: ADD_ROOM,
	room,
});

const _gotRooms = (rooms) => ({
	type: GOT_ROOMS,
	rooms,
});

export const gotSingleRoom = (room) => ({
	type: GOT_SINGLE_ROOM,
	room,
});

export const addRoom = (newRoom) => {
	return async (dispatch) => {
		const { data: room } = await axios.post("/api/room", newRoom);
		dispatch(_addRoom(room));
	};
};

export const fetchAllRooms = () => {
	return async (dispatch) => {
		const { data: rooms } = await axios.get("/api/room");
		dispatch(_gotRooms(rooms));
	};
};

const initialState = {
	allRooms: [],
	singleRoom: "",
};

export default function roomReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ROOM:
			return { ...state, allRooms: [...state.rooms, action.room] };
		case GOT_ROOMS:
			return { ...state, allRooms: action.rooms };
		case GOT_SINGLE_ROOM:
			return { ...state, singleRoom: action.room };
		default:
			return state;
	}
}
