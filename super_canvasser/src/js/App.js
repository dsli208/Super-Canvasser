
import React, { Component } from 'react';
import '../css/App.css';
import {BrowserRouter, Route } from 'react-router-dom';
//import Manager from './manager/Manager';
import ManagerCanvassersList from './manager/ManagerCanvassersList';
import ManagerLocationsList from './manager/ManagerLocationsList';
import ManagerQuestions from './manager/ManagerQuestions';
//import Canvasser from './canvasser/Canvasser';
import CanvasserViewMap from './canvasser/CanvasserViewMap';
import CanvasserAvailability from './canvasser/CanvasserAvailability';
import CanvasserAssignments from './canvasser/CanvasserAssignments';
//import CanvasserViewUpcoming from './canvasser/CanvasserViewUpcoming';
//import Admin from './admin/Admin';
import AdminAddUser from './admin/AdminAddUser';
import AdminView from './admin/AdminViewUsers';
import Main from './Main';
import CanvasserResultsList from './canvasser/CanvasserResultsList';

class App extends Component {  
  render() {    
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Main}/>
          {/* ------- Admin stuff -------- */}
          <Route path='/users/admin/:username' exact component={AdminView}/>
          <Route path='/users/admin/:username/add' exact component={AdminAddUser}/>
          <Route path='/users/admin/:username/view' exact component={AdminView}/>

          {/* ------- Manager stuff -------- */}
          <Route path='/users/manager/:username' exact component={ManagerCanvassersList}/>
          <Route path='/users/manager/:username/canvasserAssignments' exact component={ManagerCanvassersList}/>
          <Route path='/users/manager/:username/locations' exact component={ManagerLocationsList}/>
          <Route path='/users/manager/:username/questions' exact component={ManagerQuestions}/>

          {/* ------- Canvasser stuff -------- */}
          <Route path='/users/canvasser/:username' exact component={CanvasserAvailability}/>
          <Route path='/users/canvasser/:username/availability' exact component={CanvasserAvailability}/>
          <Route path='/users/canvasser/:username/assignments' exact component={CanvasserAssignments}/>
          <Route path='/users/canvasser/:username/map' exact component={CanvasserViewMap}/>
          {/* <Route path='/users/canvasser/:username/upcoming' exact component={CanvasserViewUpcoming}/> */}
          <Route path='/users/canvasser/:username/results' exact component={CanvasserResultsList}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
