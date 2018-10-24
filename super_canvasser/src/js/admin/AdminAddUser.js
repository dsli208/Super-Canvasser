import React from 'react';
import Grid from '@material-ui/core/Grid';
import Admin from './Admin';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { PersonAdd, Timelapse } from '@material-ui/icons';


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
      selectedValue: '1'
    }
  }

  handleChangeRadio = (event) => {
    this.setState({
      selectedValue: event.target.value
    })
  }

  handleAddUser = () => {

  }

  handleUpdateParam = () => {

  }

  render() {
    return (
      <div style={style}>
        <Admin/>
        <br/>
        <div style={wrap}>
          <form className="form" justify='center'>
              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                <Grid item><PersonAdd/></Grid>
                <Grid item><h1> Add new user </h1></Grid>
              </Grid>
              <div style={pad}>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>First Name:</Grid>
                  <Grid item xs={6}>
                     <TextField
                        className = 'firstName'
                        label='First Name'
                        fullWidth={true} />
                  </Grid>
                </Grid>
                <br/>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Last Name:</Grid>
                  <Grid item xs={6}> 
                     <TextField
                        className = 'lastName'
                        label='Last Name'
                        fullWidth={true} />
                  </Grid>
                </Grid>
               <br/>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Username:</Grid>
                  <Grid item xs={6}>
                      <TextField
                        className = 'username'
                        label='Username'
                        fullWidth={true} />
                  </Grid>
                </Grid>    
                <br/>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Email:</Grid>
                  <Grid item xs={6}>
                     <TextField
                        className = 'email'
                        label='Email Address'
                        fullWidth={true} />
                  </Grid>
                </Grid>
                <br/>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Phone:</Grid>
                  <Grid item xs={6}>
                     <TextField
                        className = 'phone'
                        label='Phone Number'
                        fullWidth={true} />
                  </Grid>
                </Grid>
              </div>

              <br/>
              <Grid container justify='center'>
                <Grid item><br/>Role:</Grid>
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
                <Grid item><br/>
                  <Button onClick={this.handleAddUser} variant="contained" size='large' color="primary"> Add </Button>
                </Grid>
              </Grid>
              <br/><br/>
              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                <Grid item><Timelapse/></Grid>
                <Grid item><h1> Update parameter </h1></Grid>
              </Grid>

              <div style={pad}>
                <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item xs={3}>Work day duration:</Grid>
                  <Grid item xs={6}>
                     <TextField
                        className = 'dayDuration'
                        label='Work day duration'
                        fullWidth={true} />
                  </Grid>
                </Grid>
              </div>
              <br/>
              <Grid container justify='center'>
                <Grid item><br/>
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

