import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, VpnKey, Email} from '@material-ui/icons';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styled = theme => ({
	group: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	}
});

class Register extends Component {
   state = {
      selectedValue: '1',
   };
   handleChange = (event) => {
      this.setState({
         selectedValue: event.target.value
      }, () => {
         if (this.state.selectedValue === '1') {
         } else if (this.state.selectedValue === '2') {
         } else {

         }
      })
   };
   handleLogin = () => {
      if (this.state.selectedValue === '1') {
      } else if (this.state.selectedValue === '2') {
      } else {
         window.location.href = "/manager/campaigns";
      }
   };
   render() {
   	const { classes } = this.props;
      return (
         <Grid item xs={12} container justify='center'>
            <form className="form" justify='center'>
               {/* user name text field */}
               <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item><AccountCircle/></Grid>
                  <Grid item>
                     <TextField
                        label='Username'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({username:newValue})} />
                  </Grid>
               </Grid>

               {/* user email text field */}
               <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item><Email/></Grid>
                  <Grid item>
                     <TextField
                        label='Email'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({username:newValue})} />
                  </Grid>
               </Grid>

               {/* password text field */}
               <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item><VpnKey/></Grid>
                  <Grid item>
                     <TextField
                        type="password"
                        label='Password'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({password:newValue})} />
                  </Grid>
               </Grid>
               <br/>
               <div justify='center'>
   	            <Radio checked={this.state.selectedValue === '1'} value='1' onChange={this.handleChange} />Admin
                  <Radio checked={this.state.selectedValue === '2'} value='2' onChange={this.handleChange} />Canvasser
                  <Radio checked={this.state.selectedValue === '3'} value='3' onChange={this.handleChange} />Manager
               </div>
               <Button onClick={this.handleLogin} variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>
            </form>
         </Grid>
      );
   }
}

const field_style = {
   width: 300,
   color: "#ffffff",
}
const btn_style = {
   marginTop: 10,
};

export default Register;
