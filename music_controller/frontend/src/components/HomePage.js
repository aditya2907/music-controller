import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomCode: null
		}
	}

	async componentDidMount() {
		fetch("/api/user-in-room")
			.then((response) => response.json())
			.then((data) => {
				this.state({
					roomCode: data.code
				})
			})
	}

	renderHomePage() {
		return (
			<Grid container spacing={1} alignItems="center">
				<Grid item xs={12} align="center">
					<Typography component="h3" variant="h3">
						House Party
					</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<ButtonGroup disableElevation variant="contained">
						<Button color="primary" to="/create" component={Link} >
							Create A Room
						</Button>
						<Button color="secondary" to="/join" component={Link}>
							Join A Room
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		)
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route 
						exact path="/"
						render={() => {
							return this.state.roomCode ? (
								<Redirect to={`/room/${data.code}`} />
							) : (
								this.renderHomePage()
							)
						}}
					/>
					<Route path="/join" component={RoomJoinPage} />
					<Route path="/create" component={CreateRoomPage} />
					<Route path="/room/:roomCode" component={Room} />
				</Switch>
			</Router>
		);
	}
}