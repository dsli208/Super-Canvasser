import React from 'react';
import MapUsers from './MapUsers';
import 'react-web-tabs/dist/react-web-tabs.css';
import Canvasser from './Canvasser';

import '../../css/manager.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MyMap from '../../api/MyMapComponent';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import TextField from '@material-ui/core/TextField';

const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

const field_style = {
   width: 300,
   color: "#ffffff",
};

class CanvasserViewMap extends React.Component {

  myFunction= () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -30.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap',
    });
    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });
  
    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });
    let marker = new window.google.maps.Marker({
      map: map,
      position: {lat: -30.8688, lng: 151.2195},
      
    });
  
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById('pac-input');
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
  
    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;
  
      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });
  
      // bring the selected place in view on the map
      map.fitBounds(place.geometry.viewport);
      map.setCenter(location);
  
      marker.setPlace({
        placeId: place.place_id,
        location: location,
      });
    });
  }

  sortList = () => {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("id01");
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("LI");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark the switch as done:*/
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }
  
  render() {
    return (
      <div style={style}>
        <Canvasser/>
        <br/>

        <div className='locationlist'>
          <Tabs
            defaultTab="one"
            onChange={(tabId) => { console.log(tabId) }} >
            
            <TabList>
              <Tab tabFor="one">View locations list</Tab>
              <Tab tabFor="two">Add Results</Tab>
            </TabList>
            
            <TabPanel tabId="one" className='tab1-content'>
              <Grid container>
                <Grid item xs={12}>
                  <div className="manager-location-list">
                    <br/>
                    <h1>Locations list:</h1>
      
                  </div>
                </Grid>
                <Grid item xs={12} >
                  <div className='manager-map'>
                    <br/> <h1>Map</h1> <br/>

                    <Button onClick={this.myFunction} variant="outlined"> Next Location </Button>           
                    <Button  onclick={this.sortList} variant="outlined"> Re-order Visits </Button>           
                    <ul id="id01">
  <li>Oslo</li>
  <li>Stockholm</li>
  <li>Helsinki</li>
  <li>Berlin</li>
  <li>Rome</li>
  <li>Madrid</li>
</ul>
                    <MyMap/>
                  </div>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel tabId="two">
              <form className="form" justify='center'>
                 <Grid container spacing={8} alignItems="flex-end" justify='center'>
                    <Grid item md={4}>Results:</Grid>
                    <Grid item md={8}>
                       <TextField
                          className = 'results'
                          label='Results'
                          style={field_style} />
                    </Grid>
                 </Grid>

                 <br/><br/>
                 <Button variant="outlined"> Add </Button>           
              </form>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  };
}

export default CanvasserViewMap;
