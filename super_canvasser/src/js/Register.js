import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, VpnKey, Email} from '@material-ui/icons';

class Register extends Component {
   
   render() {
      return (
         <Grid item xs={12} container justify='center'>
            <form className="form">
               {/* user name text field */}
               <Grid container spacing={8} alignItems="flex-end">
                  <Grid item><AccountCircle/></Grid>
                  <Grid item>
                     <TextField
                        label='Username'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({username:newValue})} />
                  </Grid>
               </Grid>

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

               <br/><br/>

               <Button variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>
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
