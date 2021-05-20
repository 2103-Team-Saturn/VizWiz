import React from "react";
import { connect } from "react-redux";
import ModalButton from "../modal/ModalButton";
import ChartHistory from "../historyScreen/ChartHistory";

import ButtonBase from "@material-ui/core/ButtonBase";
import CssBaseline from "@material-ui/core/CssBaseline";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import {
	Typography,
	Grid,
	Card,
	Box,
	Button,
	CardActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import RoomModal from "../rooms/RoomModal";

// images for card
const uploadDataImg =
	"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80";

const dataDashImg =
	"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80";

const historyImg =
	"https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

const collabImage =
	"https://www.meistertask.com/blog/wp-content/uploads/2020/06/Meeting-Productivity-Tips-scaled.jpg";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginTop: 150,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  contentIcon: {
    marginRight: 20,
  },
  focusVisible: {},
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  // Styling for single card
  singleCardRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

function HomeGrid({ userId }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<div className={classes.layout}>
				<Grid container spacing={10}>
					{/* Card #1 */}
					<Grid item sm={6} md={4} lg={3}>
						<Card className={classes.card}>
							<Tooltip title={`click 'IMPORT HERE' below`} placement='bottom'>
								<CardMedia
									className={classes.cardMedia}
									image={uploadDataImg}
									// style={}
								/>
							</Tooltip>
							<CardContent className={classes.cardContent}>
								<Typography variant='body2' style={{ cursor: "pointer" }}>
									<ModalButton className={classes.contentIcon} />
									Import Data Here
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={6} md={4} lg={3}>
						<Card className={classes.card}>
							<Tooltip title={`click join room`} placement='bottom'>
								<CardMedia
									className={classes.cardMedia}
									image={collabImage}
									// style={}
								/>
							</Tooltip>
							<CardContent className={classes.cardContent}>
								<Typography variant='body2' style={{ cursor: "pointer" }}>
									<RoomModal className={classes.contentIcon} />
									Join a Room
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					{/* Card #2 */}
					<Grid item sm={6} md={4} lg={3}>
						<Card className={classes.card}>
							{/* <Link to="/ChartData">Data</Link> */}
							<ButtonBase
								focusRipple
								className={classes.image}
								focusVisibleClassName={classes.focusVisible}
								component={Link}
								to={`/users/${userId}/history`}>
								<span
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${historyImg})`,
									}}
								/>
								<span className={classes.imageBackdrop} />
								<span className={classes.imageButton}>
									<Typography
										component='span'
										variant='subtitle1'
										color='inherit'
										className={classes.imageTitle}>
										History
										<span className={classes.imageMarked} />
									</Typography>
								</span>
							</ButtonBase>
						</Card>
					</Grid>
					{/* Card #3 */}
					<Grid item sm={6} md={4} lg={3}>
						<Card className={classes.card}>
							{/* <Link to="/ChartData">Data</Link> */}
							<ButtonBase
								focusRipple
								className={classes.image}
								focusVisibleClassName={classes.focusVisible}
								component={Link}
								to={`/users/${userId}/data`}>
								<span
									className={classes.imageSrc}
									style={{
										backgroundImage: `url(${dataDashImg})`,
									}}
								/>
								<span className={classes.imageBackdrop} />
								<span className={classes.imageButton}>
									<Typography
										component='span'
										variant='subtitle1'
										color='inherit'
										className={classes.imageTitle}>
										Data
										<span className={classes.imageMarked} />
									</Typography>
								</span>
							</ButtonBase>
						</Card>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
}

const mapState = (state) => {
	return {
		userId: state.auth.id,
	};
};

export default connect(mapState, null)(HomeGrid);
