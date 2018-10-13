import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, VpnKey, Email} from '@material-ui/icons';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Login extends Component {
   state = {
      selectedValue: '1',
   };
   handleChange = event => {
      this.setState({
         selectedValue: event.target.value
      })
   };
   render() {
      return (
         <Grid item xs={12} container justify='center'>
            <form className="form">
               {/* user email text field */}
               <Grid container spacing={8} alignItems="flex-end">
                  <Grid item><Email/></Grid>
                  <Grid item>
                     <TextField
                        label='Email'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({username:newValue})} />
                  </Grid>
               </Grid>

               {/* password text field */}
               <Grid container spacing={8} alignItems="flex-end">
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

               <Radio checked={this.state.selectedValue === '1'} value='1' onChange={this.handleChange} />Admin
               <Radio checked={this.state.selectedValue === '2'} value='2' onChange={this.handleChange} />Canvasser
               <Radio checked={this.state.selectedValue === '3'} value='3' onChange={this.handleChange} />Manager
               
               <Button variant="contained" color="primary" fullWidth={true} style={btn_style}> Log In </Button>
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

export default Login;
