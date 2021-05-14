const axios = require('axios')

const initialState = []
const ADD_GRAPH = 'ADD_GRAPH'
const GET_GRAPHS = 'GET_GRAPHS'
const DELETE_GRAPH = 'DELETE_GRAPH'

export const addGraph = graph => ({
  type: ADD_GRAPH,
  graph
})

export const getGraphs = graphs => ({
  type: GET_GRAPHS,
  graphs
})

export const deleteGraph = id => ({
  type: DELETE_GRAPH,
  id
})


export const postGraph = (graphData, userId, dataId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/users/${userId}/data/${dataId}`, graphData)
    dispatch(addGraph(data))
  } catch (err) {
    console.error(err)
  }
}

export const gotGraphs = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/ChartHistory')
    dispatch(getGraphs(data))
  } catch (err) {
    console.error(err)
  }
}

export const deletingGraph = id => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/ChartHistory/${id}`)
      const action = deleteGraph(id)
      dispatch(action)
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GRAPHS:
      return [...action.graphs]
    case ADD_GRAPH:
      return [...state, action.graph]
    case DELETE_GRAPH:
      const newList = state.filter(graph => graph.id !== action.id)
      return newList
    default:
      return state
  }
}
