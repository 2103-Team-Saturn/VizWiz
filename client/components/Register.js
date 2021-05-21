import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

export class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { name, displayName, handleSubmit, error } = this.props;

		return (
			<div className='base-container' ref={this.props.containerRef}>
				<div className='header'>Register</div>
				<div className='content'>
					<div className='image'>
						<img src='./images/login.png' />
					</div>
					<form className='form' onSubmit={handleSubmit} name='signup'>
						<div className='form-group'>
							<label htmlFor='username'>Email</label>
							<input type='text' name='username' placeholder='email' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='text' name='password' placeholder='password' />
						</div>
						<div className='footer'>
							<button type='submit' className='btn'>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapSignup = (state) => {
	return {
		name: "signup",
		displayName: "Sign Up",
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

export const Signup = connect(mapSignup, mapDispatch)(RegisterForm);
