import React, { Component } from 'react';
import Image from 'react-image-resizer';
import '../css/App.css';
import appLogo from '../img/app_logo.png';
import Grid from '@material-ui/core/Grid';
import LoginAndRegister from './LoginAndRegister';
import {BrowserRouter, Route } from 'react-router-dom';
import Manager from './manager/Manager';
import Main from './Main';

class App extends Component {
   
   render() {
      return (
         <BrowserRouter>
            <div>
               <Route path='/' exact strict component={Main}/>
               <Route path='/manager' exact strict component={Manager}/>
            </div>
         </BrowserRouter>

      );
   }
}

export default App;
