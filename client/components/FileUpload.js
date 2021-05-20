import React, { Component } from "react";

import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";
import { addData } from "../store/data";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			name: "",
			open: false,
		};

		this.handleOnDrop = this.handleOnDrop.bind(this);
		this.handleOnError = this.handleOnError.bind(this);
		this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose(evt, reason) {
		if (reason === "clickaway") {
			return;
		}

		this.setState({ open: false });
	}

	handleOnDrop(data) {
		console.log("---------------------------");
		let result = [];
		data.forEach((data) => result.push(data.data));
		this.setState({ data: result });
		console.log(result);
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

	handleOnChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.addData(this.props.userId, this.state.data, this.state.name);
		this.setState({
			open: true,
		});
	}

	render() {
		return (
			<React.Fragment>
				<CSVReader
					onDrop={this.handleOnDrop}
					onError={this.handleOnError}
					config={{
						header: true,
						skipEmptyLines: "greedy",
						transform: (value) => {
							return value.replace(/\$|,/g, "");
						},
						dynamicTyping: true,
					}}
					noDrag
					addRemoveButton
					onRemoveFile={this.handleOnRemoveFile}>
					{" "}
					<span>Click to upload.</span>
				</CSVReader>
				{/* <button onClick={() => addData(userId, values)}>Submit</button> */}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='name'>Data Set Name:</label>
					<input
						name='name'
						onChange={this.handleOnChange}
						value={this.state.name}
					/>

					<Button color='primary' type='submit' aria-label='add to database'>
						Submit
					</Button>
				</form>
				<div>
					<Snackbar
						open={this.state.open}
						autoHideDuration={3000}
						onClose={this.handleClose}
						ContentProps={{
							"aria-describedby": "message-id",
						}}>
						<Alert onClose={this.handleClose} severity='success'>
							Data uploaded!
						</Alert>
					</Snackbar>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data.data,
	userId: state.auth.id,
	loading: state.data.loading,
});

const mapDispatchToProps = (dispatch) => ({
	addData: (userId, data, name) => dispatch(addData(userId, data, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
