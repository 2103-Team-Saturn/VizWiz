import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, formatData } from '../store/singleData';

class SingleData extends Component {
  componentDidMount() {
    this.props.fetchSingleData(
      this.props.userId,
      this.props.match.params.dataId
    );
  }

  render() {
    // put into prototype or util.js file
    const data = this.props.unformattedData.values || [];

    const firstLine = data[0] || {};

    const keys = Object.keys(firstLine);

    let obj = {};

    for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i];
      obj[currentKey] = [];
      data.map((item) => obj[currentKey].push(item[currentKey]));
    }
    return (
      <div>
        <h1>{this.props.unformattedData.name}</h1>
        <button onClick={() => this.props.formatData(obj)}>Format Data</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    formattedData: state.singleData.formatted,
    unformattedData: state.singleData.unformatted,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleData: (userId, dataId) =>
      dispatch(fetchSingleData(userId, dataId)),
    formatData: (data) => dispatch(formatData(data)),
  };
};

export default connect(mapState, mapDispatch)(SingleData);

// const data = this.props.data || [];

// 		const first = data[0] || {};

// 		const firstValues = first.values || {};

// 		const firstOne = firstValues[0] || {};
// 		const keys = Object.keys(firstOne);

// 		let obj = {};
// 		console.log("NOT SORTED", firstValues);

// 		for (let i = 0; i < keys.length; i++) {
// 			let currentKey = keys[i];
// 			obj[currentKey] = [];
// 			firstValues.map((item) => obj[currentKey].push(item[currentKey]));
// 		}

// 		console.log("SORTED", obj);
