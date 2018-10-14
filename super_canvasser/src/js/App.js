import React, { Component } from 'react';
import Image from 'react-image-resizer';
import '../css/App.css';
import appLogo from '../img/app_logo.png';
import Grid from '@material-ui/core/Grid';
import LoginAndRegister from './LoginAndRegister';
import {BrowserRouter, Route } from 'react-router-dom';
import Manager from './manager/Manager';
import Canvasser from './canvasser/Canvasser';
import Admin from './admin/Admin';

import Main from './Main';

class App extends Component {
   
   render() {
      return (
         <BrowserRouter>
            <div>
               <Route path='/' exact strict component={Main}/>
               <Route path='/manager' exact strict component={Manager}/>
               <Route path='/canvasser' exact strict component={Canvasser}/>
               <Route path='/admin' exact strict component={Admin}/>
            </div>
         </BrowserRouter>

      );
   }
}

export default App;



//<input class="RegitserButton" color="primary" fullWidth={true} onlick="window.location.href='http://www.google.com/'" type="button" value="Register"/>

//<Button variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>
//<Confirm/>



//					<Button onClick={() => {console.log("clicked")}} variant="contained" color="primary" fullWidth={true} style={btn_style}> Register </Button>