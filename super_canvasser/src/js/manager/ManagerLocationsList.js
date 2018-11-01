import React from 'react';
import '../../css/manager.css';
import Manager from './Manager';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableLocations from './TableLocations';
import TextField from '@material-ui/core/TextField';
import {AddLocation} from '@material-ui/icons';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

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

class GoogleMapExample extends React.Component {
  state = {
    API_KEY: 'AIzaSyC3A1scukBQw2jyAUqwHHTw4Weob5ibZiY',
    currentId: '',
    currentAddress: '',
  }

  handleClick = (coord, idx) => {
    var latitude = coord.lat;
    var longitude = coord.lng;

    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + this.state.API_KEY)
      .then(res => res.json())
      .then(data => this.setState({ currentAddress: data.results[0].formatted_address }))
      .catch(err => console.log(err))

    this.setState({
      currentId: idx
    })
  }

  render() {
    return(
        <GoogleMap
        defaultCenter = {{lat: 37.090240, lng: -95.712891}}
        zoom = { 8 }
        ref={(map) => map && map.fitBounds(this.props.bounds)}
        >
          
          {this.props.listLocations.map((coord,idx) => 
            <Marker key={idx} position={coord} label='view'
              onClick={()=>this.handleClick(coord, idx)} >

              {this.state.currentId === idx ?
                <InfoWindow onCloseClick={() => this.setState({currentId: -1})}>
                  <div>
                    <p>{this.state.currentAddress.split(", ")[0]}</p>
                    <p>{this.state.currentAddress.split(", ")[1]}, {this.state.currentAddress.split(", ")[2]}, {this.state.currentAddress.split(", ")[3]}</p>
                  </div>
                </InfoWindow> : null
              }
            </Marker>
          )}
          
        </GoogleMap>
      
    )
  }
}

GoogleMapExample = withGoogleMap(GoogleMapExample);


class ManagerLocationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_street: '',
      input_city: '',
      input_state: '',
      input_country: '',
      input_zipcode: '',
      input_duration: '',

      locationTable: null,
      locationMap: null,

      selectedLocations: [],
      deleteLocation_list: [],
      bounds: new window.google.maps.LatLngBounds(),
    }
  }

  componentWillMount() {
    this.loadLocationList() 
    this.loadMap()
  }

  deleteLocation = (deleteLocation_list) => {
    this.setState({
      deleteLocation_list: deleteLocation_list
    }, () => {
      deleteLocation_list.forEach(location => {
        //console.log('to be del: ', location);
        var fullAddress = location.fullAddress.replace(/ /g, '+');
        var street = location.street.replace(/ /g, '+');
        var city = location.city.replace(/ /g, '+');
        var state = location.state.replace(/ /g, '+');
        var zipcode = location.zipcode;
        var country = location.country.replace(/ /g, '+');

        fetch(`/locations/delete?fullAddress=` +
           `${fullAddress}&street=${street}`
           + `&city=${city}`
           + `&state=${state}`
           + `&zipcode=${zipcode}`
           + `&country=${country}`)
        .catch(err => console.log(err))
        console.log('Delete location done!');
      })
      this.setState({selectedLocations : []}, () => this.loadLocationList());
    })
  }


  updateLocation = (location) => {
    console.log('update: ', location);

    var fullAddress = location.fullAddress.replace(/ /g, '+');
    var street = location.street.replace(/ /g, '+');
    var city = location.city.replace(/ /g, '+');
    var state = location.state.replace(/ /g, '+');
    var zipcode = location.zipcode;
    var country = location.country.replace(/ /g, '+');
    var duration = location.duration;

    fetch(`/locations/edit?id=${location.id}` 
            + `&fullAddress=${fullAddress}`
            + `&street=${street}`
            + `&city=${city}`
            + `&state=${state}`
            + `&zipcode=${zipcode}`
            + `&country=${country}`
            + `&duration=${duration}`)
      .catch(err => console.log(err))
      console.log('Update successfully!');

    this.loadLocationList();
  }

  loadLocationList = () => {
    fetch('/locations')
      .then(res => res.json())
      .then(locations => {
        var list = <TableLocations 
                      listLocation={locations} 
                      selectedLocations={this.set_selectedLocations} 
                      display={this.displayLocations} 
                      deleteLocation={this.deleteLocation}
                      updateLocation={this.updateLocation} 
                      />

        this.setState({
          locationTable: list
        }) 
      })
      .catch(err => console.log(err)) 
  }

  loadMap = () => {
    this.setState({
      locationMap: <GoogleMapExample
                    listLocations={this.state.selectedLocations}
                    bounds={this.state.bounds}
                    containerElement={ <div style={{ height: `420px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                  />
    })
  }


  set_selectedLocations = (list) => {
    this.setState({
      selectedLocations: list
    }, () => {
      this.loadMap()
    })
  }

  displayLocations = (displayList) => {
    displayList.map(location => {
      this.state.bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
    })
    this.setState({
      selectedLocations: displayList,
    }, () => {
      this.loadMap()
    })
  }

  handleTFchange = (event) => {
    if (event.target.id === 'street') {
      this.setState({input_street: event.target.value})
    } else if (event.target.id === 'city') {
      this.setState({input_city: event.target.value})
    } else if (event.target.id === 'state') {
      this.setState({input_state: event.target.value})
    } else if (event.target.id === 'zipcode') {
      this.setState({input_zipcode: event.target.value})
    } else if (event.target.id === 'country') {
      this.setState({input_country: event.target.value})
    } else if (event.target.id === 'duration') {
      this.setState({input_duration: event.target.value})
    }
  }

  handleAddLocation = () => {
    var fullAddress = this.state.input_street + ', '
                        + this.state.input_city + ', '
                        + this.state.input_state + ', '
                        + this.state.input_zipcode + ', '
                        + this.state.input_country;
    fullAddress = fullAddress.replace(/ /g, '+');
    //console.log(fullAddress);
    var street = this.state.input_street.replace(/ /g, '+');
    var city = this.state.input_city.replace(/ /g, '+');
    var state = this.state.input_state.replace(/ /g, '+');
    var zipcode = parseInt(this.state.input_zipcode, 10);
    var country = this.state.input_country.replace(/ /g, '+');
    var duration = parseInt(this.state.input_duration, 10);


    fetch(`/locations/add?fullAddress=` +
           `${fullAddress}&street=${street}`
           + `&city=${city}`
           + `&state=${state}`
           + `&zipcode=${zipcode}`
           + `&country=${country}`
           + `&duration=${duration}`)
    .catch(err => console.log(err))
    console.log('Add location done!');
    this.loadLocationList();
  }

  render() {

    return (
      <div style={style}>
        <Manager/>
        <br/>

        <div className='locationlist'>
          <Grid container justify='center'>
            <Grid item xs={6} style={{marginRight: '20px'}}>
              <div className="manager-location-list">
                <br/>
                <h1>Locations list</h1>
                {this.state.locationTable}
              </div>
            </Grid>
            <Grid item xs={5} >
              <div className='manager-map'>
                <br/> <h1>Map</h1> <br/>
                {this.state.locationMap}
              </div>
            </Grid>

            <Grid container spacing={8} alignItems="flex-end" justify='center' style={{marginTop: '40px', marginBottom: '20px', backgroundColor: 'F0F8FF'}}>
              <Grid item> <AddLocation/></Grid>
              <Grid item> <h1>Add location</h1></Grid>
            </Grid>

            <Grid container style={{backgroundColor: '#F0F8FF', maxWidth: '600px', paddingBottom: '30px', boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.89) '}} justify='center' >
            <form className="form" justify='center'>
              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item md={4}>Street:</Grid>
                  <Grid item md={8}>
                    <TextField
                        id='street'
                        className = 'street'
                        label='Street'
                        style={field_style}
                        onChange={this.handleTFchange} />
                  </Grid>
              </Grid>

              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item md={4}>City:</Grid>
                  <Grid item md={8}>
                    <TextField
                        id='city'
                        className = 'city'
                        label='City'
                        style={field_style}
                        onChange={this.handleTFchange} />
                  </Grid>
              </Grid>
              
              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item md={4}>State:</Grid>
                  <Grid item md={8}>
                    <TextField
                        id='state'
                        className = 'state'
                        label='State'
                        style={field_style}
                        onChange={this.handleTFchange} />
                  </Grid>
              </Grid>    

              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item md={4}>Zip code:</Grid>
                  <Grid item md={8}>
                    <TextField
                        id='zipcode'
                        className = 'zipcode'
                        label='Zip code'
                        style={field_style}
                        onChange={this.handleTFchange} />
                  </Grid>
              </Grid>    

              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item md={4}>Country:</Grid>
                  <Grid item md={8}>
                    <TextField
                        id='country'
                        className = 'country'
                        label='Country'
                        style={field_style}
                        onChange={this.handleTFchange} />
                  </Grid>
              </Grid>   

              <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item md={4}>Visit duration:</Grid>
                  <Grid item md={8}>
                    <TextField
                        id='duration'
                        className = 'duration'
                        label='Visit duration'
                        style={field_style}
                        onChange={this.handleTFchange} />
                  </Grid>
              </Grid>    

              <Grid container justify='center'>
                <Grid item><br/><br/>
                  <Button onClick={this.handleAddLocation} variant="contained" color="primary"> Add new location </Button>
                </Grid>
              </Grid>  
            </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
}

export default ManagerLocationsList;

