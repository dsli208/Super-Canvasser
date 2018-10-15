import React, { Component } from 'react';
import '../css/App.css';
import {BrowserRouter, Route } from 'react-router-dom';
import Manager from './manager/Manager';
import ManagerCampaignsList from './manager/ManagerCampaignsList';
import ManagerCanvassersList from './manager/ManagerCanvassersList';
import ManagerLocationsList from './manager/ManagerLocationsList';
import Canvasser from './canvasser/Canvasser';
import Main from './Main';

class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}, () =>
        console.log("fetched..", users)));
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact strict component={Main}/>
          <Route path='/manager' exact strict component={Manager}/>
          <Route path='/manager/campaigns' exact strict component={ManagerCampaignsList}/>
          <Route path='/manager/canvassers' exact strict component={ManagerCanvassersList}/>
          <Route path='/manager/locations' exact strict component={ManagerLocationsList}/>
          <Route path='/canvasser' exact strict component={Canvasser}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
