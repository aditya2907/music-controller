import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { FormHelperText } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
	defaultVotes = 2;

	constructor(props) {
		super(props);
		this.state = {
			guest_can_pause: true,
			votes_to_skip: this.defaultVotes,
		};
		this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
		this.handleguest_can_pauseChange = this.handleguest_can_pauseChange.bind(this);
		this.handleVotesChange = this.handleVotesChange.bind(this);
	}

	handleVotesChange(e) {
		this.setState({
			votes_to_skip: e.target.value,
		});
	}

	handleguest_can_pauseChange(e) {
		this.setState({
			guest_can_pause: e.target.value == "true" ? true : false,
		});
	}

	handleRoomButtonPressed() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				votes_to_skip: this.state.votesToSkip,
				guest_can_pause: this.state.guestCanPause,
			}),
		};
		fetch("/api/create-room", requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	render() {
		return (
			<Grid container spacing={1}>
				<Grid item xs={12} align="center">
					<Typography component="h4" variant="h4">
						Create A Room
					</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl component="fieldset">
						<FormHelperText >
							<span align="center">Guest Control of Playback State</span>
						</FormHelperText>
						<RadioGroup
							row
							defaultValue="true"
							onChange={this.handleguest_can_pauseChange}
						>
							<FormControlLabel
								value="true"
								control={<Radio color="primary" />}
								label="Play/Pause"
								labelPlacement="bottom"
							/>
							<FormControlLabel
								value="false"
								control={<Radio color="secondary" />}
								label="No Control"
								labelPlacement="bottom"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl>
						<TextField
							required={true}
							type="number"
							onChange={this.handleVotesChange}
							defaultValue={this.defaultVotes}
							inputProps={{
								min: 1,
								style: { textAlign: "center" },
							}}
						/>
						<FormHelperText>
							<span align="center">Votes Required To Skip Song</span>
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} align="center">
					<Button
						color="primary"
						variant="contained"
						onClick={this.handleRoomButtonPressed}
						to="create" component={Link}
					>
						Create A Room
					</Button>
				</Grid>
				<Grid item xs={12} align="center">
					<Button color="secondary" variant="contained" to="/" component={Link}>
						Back
					</Button>
				</Grid>
			</Grid>
		);
	}
}

