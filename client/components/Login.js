import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		const { name, displayName, handleSubmit, error } = this.props;
		return (
			<div className='base-container' ref={this.props.containerRef}>
				<div className='header'>Login</div>
				<div className='content'>
					<div className='image'>
						<img src='./images/login.png' />
					</div>
					<form className='form' onSubmit={handleSubmit} name='login'>
						<div className='form-group'>
							<label htmlFor='username'>Email</label>
							<input type='text' name='username' placeholder='email' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' name='password' placeholder='password' />
						</div>
						<div className='footer'>
							<button type='submit' className='btn'>
								Login
							</button>
						</div>
						{error && error.response && <div> {error.response.data} </div>}
					</form>
				</div>
			</div>
		);
	}
}

const mapLogin = (state) => {
	return {
		name: "login",
		displayName: "Login",
		error: state.auth.error,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const username = evt.target.username.value;
			const password = evt.target.password.value;
			dispatch(authenticate(username, password, formName));
		},
	};
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
