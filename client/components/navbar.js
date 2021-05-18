import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#e0e0e0",
		},
		secondary: {
			main: "#38b6ff",
		},
	},
});
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		color: "#000",
	},
	logo: {
		maxWidth: 150,
	},
	navDisplayFlex: {
		flexGrow: 1,
		display: "flex",
		justifyContent: "space-between",
	},
}));

const Navbar = ({ handleClick, isLoggedIn, userId }) => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={customTheme}>
			<div className={classes.root}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton edge='start' className={classes.menuButton}>
							<img src='/images/VizWiz.png' className={classes.logo} />
						</IconButton>
						<div className='navDisplayFlex'>
							<nav>
								{isLoggedIn ? (
									<div>
										{/* The navbar will show these links after you log in */}
										<Link to='/home'>
											<Typography variant='h6' className={classes.title}>
												Home
											</Typography>
										</Link>
										<Link to={`/users/${userId}/data`}>
											<Typography variant='h6' className={classes.title}>
												Data
											</Typography>
										</Link>
										<Link to='/room'>
											<Typography variant='h6' className={classes.title}>
												Join a Room
											</Typography>
										</Link>
										<a href='#' onClick={handleClick}>
											<Typography variant='h6' className={classes.title}>
												Logout
											</Typography>
										</a>
									</div>
								) : (
									<div>
										{/* The navbar will show these links before you log in */}
										<Link to='/login'>
											<Typography variant='h6' className={classes.title}>
												Login
											</Typography>
										</Link>
										<Link to='/signup'>
											<Typography variant='h6' className={classes.title}>
												Sign Up
											</Typography>
										</Link>
									</div>
								)}
							</nav>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</ThemeProvider>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		userId: state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
