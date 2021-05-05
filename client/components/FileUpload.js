import React, { Component } from "react";

import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";
import { addData } from "../store/data";

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};

		this.handleOnDrop = this.handleOnDrop.bind(this);
		this.handleOnError = this.handleOnError.bind(this);
		this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
	}
	handleOnDrop(data) {
		console.log("---------------------------");
		let result = [];
		data.forEach((data) => result.push(data.data));
		this.setState({ data: result });
		console.log("---------------------------");
	}

	handleOnError(err, file, inputElem, reason) {
		console.log(err);
	}

	handleOnRemoveFile(data) {
		console.log("---------------------------");
		console.log(data);
		console.log("---------------------------");
	}

	render() {
		const userId = this.props.userId;
		const values = this.state.data;
		const { addData } = this.props;
		console.log(this.props);
		return (
			<div>
				<CSVReader
					onDrop={this.handleOnDrop}
					onError={this.handleOnError}
					config={{ header: true }}
					addRemoveButton
					onRemoveFile={this.handleOnRemoveFile}>
					{" "}
					<span>Drop CSV file here or click to upload.</span>
				</CSVReader>
				<button onClick={() => addData(userId, values)}>Submit</button>
				<div></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data,
	userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
	addData: (userId, data) => dispatch(addData(userId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
