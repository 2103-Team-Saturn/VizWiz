import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';

import { CSVReader } from 'react-papaparse';
import { connect } from 'react-redux';
import { addData } from '../store/data';
import { Button } from '@material-ui/core';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      name: '',
    };

    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handleOnError = this.handleOnError.bind(this);
    this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnDrop(data) {
    console.log('---------------------------');
    let result = [];
    data.forEach((data) => result.push(data.data));
    this.setState({ data: result });
    console.log(result);
    console.log('---------------------------');
  }

  handleOnError(err, file, inputElem, reason) {
    console.log(err);
  }

  handleOnRemoveFile(data) {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  }

  handleOnChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const userId = this.props.userId;
    const values = this.state.data;
    const { addData } = this.props;
    return (
      <React.Fragment>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          config={{
            header: true,
            transform: (value) => {
              return value.replace(/\$|,/g, '');
            },
            dynamicTyping: true,
          }}
          noDrag
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          {' '}
          <span>Click to upload.</span>
        </CSVReader>
        {/* <button onClick={() => addData(userId, values)}>Submit</button> */}
        <form>
          <label htmlFor="name">Data Set Name:</label>
          <input
            name="name"
            onChange={this.handleOnChange}
            value={this.state.name}
          />
        </form>

        <Button
          color="primary"
          aria-label="add to database"
          onClick={() => addData(userId, values, this.state.name)}
        >
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
  addData: (userId, data, name) => dispatch(addData(userId, data, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
