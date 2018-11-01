import React from 'react';
import Grid from '@material-ui/core/Grid';
import Admin from './Admin';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { PersonAdd, Timelapse } from '@material-ui/icons';
import FormHelperText from '@material-ui/core/FormHelperText';


const style = {
	backgroundColor: '#ffffff',
	position: 'absolute',
	minHeight: '100%',
	minWidth: '100%',
};

const wrap = {
	margin: '3% 15% 3% 15%',
};

const pad = {
	paddingLeft: '13%',
}

class AdminAddUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValue: '1',
			firstName: '',
			lastName: '',
			username: '',
			email: '',

			firstNameValid: true,
			lastNameValid: true,
			userNameValid: true,
			emailValid: true,

			success: false
		}
	}

	handleChangeRadio = (event) => {
		this.setState({
			selectedValue: event.target.value
		})
	}

	handleChangeField = (event) => {
		if (event.target.type === 'text') {
			if (event.target.id === 'firstName') {
				//first name
				this.setState({
						firstName: event.target.value
				})
			} else if (event.target.id === 'lastName') {
				// last name
				this.setState({
						lastName: event.target.value
				})
			} else if (event.target.id === 'username') {
				// username
				this.setState({
						username: event.target.value
				})
			} else {
				// email
				this.setState({
						email: event.target.value
				})
			}
		}
	}

	handleAddUser = () => {
		const inFirstName = this.state.firstName;
		const inLastName = this.state.lastName;
		const inUserName = this.state.username;
		const inEmail = this.state.email;

		if (inFirstName === '') {
			console.log('Blank first name');
			this.setState({
				firstNameValid: false
			})
		} else if (inLastName === '') {
			console.log('Blank last name');
			this.setState({
				firstNameValid: true,
				lastNameValid: false
			})
		} else {
			this.setState({
				firstNameValid: true,
				lastNameValid: true
			})
			fetch('/users')
				.then(res => res.json())
				.then(users => {
					var userObj = users.find((user) => user.username === inUserName);

					if (typeof userObj === 'undefined') {
						// username not exist => good
						console.log("work");
						this.setState({
							userNameValid: true
						})
						userObj = users.find((user) => user.email === inEmail);
						if (typeof userObj === 'undefined') {
							// email not exist => good
							this.setState({
								emailValid: true
							})

							// password is good, all inputs are valid!
							this.setState({
								success: true
							})
							const { firstName, lastName, username, email } = this.state;
							var password = "1234";
							var role = "";
							if (this.state.selectedValue === 1) {
								role = "admin";
							} else if (this.state.selectedValue === 2) {
								role = "canvasser";
							} else {
								role = "manager";
							}

							fetch(`/users/add?firstName=${firstName}&lastName=${lastName}&username=${username}&email=${email}&password=${password}&role=${role}`)
								.catch((err) => console.log(err))

							console.log('Registered user done!');

						} else {
							console.log('Existed email!');
							this.setState({
								emailValid: false
							})
						}
					} else {
							console.log('Existed username!');
							console.log(inUserName);
							this.setState({
									userNameValid: false
							})
					}
				})
		}
	}

	handleUpdateParam = () => {

	}

	render() {
		return (
			<div style={style}>
				<Admin />
				<br />
				<div style={wrap}>
					<form className="form" justify='center'>
						<Grid container spacing={8} alignItems="flex-end" justify='center'>
								<Grid item><PersonAdd /></Grid>
								<Grid item><h1> Add new user </h1></Grid>
						</Grid>
						<div style={pad}>
							<Grid container spacing={8} alignItems="flex-end" justify='center'>
								<Grid item xs={3}>First Name:</Grid>
								<Grid item xs={6}>
										<TextField
												id='firstName'
												className='firstName'
												label='First Name'
												fullWidth={true}
												onChange={this.handleChangeField} />
										{this.state.firstNameValid ? null : <FormHelperText id="component-error-text">Please fill in!</FormHelperText>}
								</Grid>
							</Grid>
							<br />
							<Grid container spacing={8} alignItems="flex-end" justify='center'>
								<Grid item xs={3}>Last Name:</Grid>
								<Grid item xs={6}>
										<TextField
												id='lastName'
												className='lastName'
												label='Last Name'
												fullWidth={true}
												onChange={this.handleChangeField} />
										{this.state.lastNameValid ? null : <FormHelperText id="component-error-text">Please fill in!</FormHelperText>}
								</Grid>
							</Grid>
							<br />
							<Grid container spacing={8} alignItems="flex-end" justify='center'>
									<Grid item xs={3}>Username:</Grid>
									<Grid item xs={6}>
											<TextField
													id='username'
													className='username'
													label='Username'
													fullWidth={true}
													onChange={this.handleChangeField} />
											{this.state.userNameValid ? null : <FormHelperText id="component-error-text">Existed username! Please use another username!</FormHelperText>}
									</Grid>
							</Grid>
							<br />
							<Grid container spacing={8} alignItems="flex-end" justify='center'>
									<Grid item xs={3}>Email:</Grid>
									<Grid item xs={6}>
											<TextField
													id='email'
													className='email'
													label='Email Address'
													fullWidth={true}
													onChange={this.handleChangeField} />
											{this.state.emailValid ? null : <FormHelperText id="component-error-text">Existed email! Please use another email!</FormHelperText>}
									</Grid>
							</Grid>
							<br />
							<Grid container spacing={8} alignItems="flex-end" justify='center'>
									<Grid item xs={3}>Phone:</Grid>
									<Grid item xs={6}>
											<TextField
													id='phone'
													className='phone'
													label='Phone Number'
													fullWidth={true}
													onChange={this.handleChangeField} />
									</Grid>
							</Grid>
						</div>

						<br />
						<Grid container justify='center'>
								<Grid item><br />Role:</Grid>
						</Grid>
						<Grid container justify='center'>
								<Grid item>
										<div justify='center'>
												<Radio checked={this.state.selectedValue === '1'} value='1' onChange={this.handleChangeRadio} />Admin
												<Radio checked={this.state.selectedValue === '2'} value='2' onChange={this.handleChangeRadio} />Canvasser
												<Radio checked={this.state.selectedValue === '3'} value='3' onChange={this.handleChangeRadio} />Manager
										</div>
								</Grid>
						</Grid>

						<Grid container justify='center'>
								<Grid item><br />
										<Button onClick={this.handleAddUser} variant="contained" size='large' color="primary"> Add </Button>
								</Grid>
						</Grid>
						<br /><br />
						<Grid container spacing={8} alignItems="flex-end" justify='center'>
								<Grid item><Timelapse /></Grid>
								<Grid item><h1> Update parameter </h1></Grid>
						</Grid>

						<div style={pad}>
								<Grid container spacing={8} alignItems="flex-end" justify='center'>
										<Grid item xs={3}>Work day duration:</Grid>
										<Grid item xs={6}>
												<TextField
														className='dayDuration'
														label='Work day duration'
														fullWidth={true} />
										</Grid>
								</Grid>
						</div>
						<br />
						<Grid container justify='center'>
								<Grid item><br />
										<Button onClick={this.handleUpdateParam} variant="contained" size='large' color="primary"> Update </Button>
								</Grid>
						</Grid>

					</form>
				</div>
			</div>
		);
	};
}

export default AdminAddUser;

