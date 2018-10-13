import React, { Component } from 'react';
import Image from 'react-image-resizer';
import '../css/App.css';
import appLogo from '../img/app_logo.png';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, VpnKey, Email} from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Confirm from './Confirm';
import {BrowserRouter, Route, Link} from "react-router-dom";

class App extends Component {
    render() {
            return (
         <Grid className="container" container spacing={0} direction='column' justify='center'>
            <Grid item xs={12} className="appLogo" container justify='center'>
               <Image src={appLogo} height={150} width={150}/>
            </Grid>
            <Grid item xs={12} className="header" container justify='center'>
               <h1 className='title'>Super Canvasser</h1>
            </Grid>

            <AppBar position="static" color="default">
               <Tabs indicatorColor="primary" textColor="primary" fullWidth>
                  <Tab label="Register" />
                  <Tab label="Sign In" />
               </Tabs>
            </AppBar>


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
                  
                  <a href={Confirm}><button>Go To Login</button></a>
                 
               </form>
            </Grid>
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

export default App;



//<input class="RegitserButton" color="primary" fullWidth={true} onlick="window.location.href='http://www.google.com/'" type="button" value="Register"/>

//<Button variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>
//<Confirm/>



//					<Button onClick={() => {console.log("clicked")}} variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>