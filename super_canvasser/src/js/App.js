import React, { Component } from 'react';
import Image from 'react-image-resizer';
import '../css/App.css';
import appLogo from '../img/app_logo.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, VpnKey, Email} from '@material-ui/icons';
//import {Tabs, Tab} from 'react-bootstrap';
import LoginAndRegister from './LoginAndRegister';
import {BrowserRouter, Route } from 'react-router-dom';









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

            <BrowserRouter>
               <Route path='/' component={LoginAndRegister}/>
            </BrowserRouter>



         </Grid>
      );
   }
}

export default App;



//<input class="RegitserButton" color="primary" fullWidth={true} onlick="window.location.href='http://www.google.com/'" type="button" value="Register"/>

//<Button variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>
//<Confirm/>



//					<Button onClick={() => {console.log("clicked")}} variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>