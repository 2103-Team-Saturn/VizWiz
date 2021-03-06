import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import ForumIcon from "@material-ui/icons/Forum";

import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import RoomForm from "./RoomForm";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 500,
		marginTop: 100,
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	contentIcon: {
		marginRight: 20,
	},
	fab: {
		margin: theme.spacing(2),
	},
}));

export default function RoomModal(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Tooltip title='Join Room' aria-label='join'>
				<Fab color='primary' className={classes.fab}>
					<ForumIcon onClick={handleOpen} />
				</Fab>
			</Tooltip>

			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<RoomForm />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
