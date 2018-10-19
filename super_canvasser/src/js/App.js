
import React, { Component } from 'react';
import '../css/App.css';
import {BrowserRouter, Route } from 'react-router-dom';
import Manager from './manager/Manager';
import ManagerCampaignsList from './manager/ManagerCampaignsList';
import ManagerCanvassersList from './manager/ManagerCanvassersList';
import ManagerLocationsList from './manager/ManagerLocationsList';
import Canvasser from './canvasser/Canvasser';
import Admin from './admin/Admin';
import AdminAddUser from './admin/AdminAddUser';
import AdminView from './admin/AdminViewUsers';
import Main from './Main';

class App extends Component {  
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Main}/>
          {/* ------- Admin stuff -------- */}
          <Route path='/users/admin' exact component={Admin}/>
          <Route path='/users/admin/:username' exact component={Admin}/>
          <Route path='/users/admin/:username/add' exact component={AdminAddUser}/>
          <Route path='/users/admin/:username/view' exact component={AdminView}/>

          {/* ------- Manager stuff -------- */}
          <Route path='/users/manager/:username' exact component={Manager}/>
          <Route path='/users/manager/:username/campaigns' exact component={ManagerCampaignsList}/>
          <Route path='/users/manager/:username/canvassers' exact component={ManagerCanvassersList}/>
          <Route path='/users/manager/:username/locations' exact component={ManagerLocationsList}/>

          {/* ------- Canvasser stuff -------- */}
          <Route path='/canvasser' exact component={Canvasser}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
