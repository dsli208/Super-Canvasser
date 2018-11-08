import React from 'react';
import '../../css/manager.css';
import Manager from './Manager';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableLocations from './TableLocations';
import TextField from '@material-ui/core/TextField';
import {AddLocation , ListAlt} from '@material-ui/icons';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
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


const paper_styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});


class PaperSheet extends React.Component {
  render() {
    const {classes, qa} = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <div justify='center'>
          <Typography>
            <strong>Question:</strong> {qa.question}
          </Typography>
          <Typography>
            <strong>Answer:</strong> {qa.answer}
          </Typography>
        </div>
      </Paper>
    )
  }
}

PaperSheet = withStyles(paper_styles)(PaperSheet);


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

      resultLocations: null,
      resultComponent: null,
      bounds: null,
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.load()
    }, 500);
  }

  load = () => {
    this.setState({
      bounds: new window.google.maps.LatLngBounds()
    }, () => {
      this.loadResult()
      this.loadLocationList() 
      this.loadMap()
    })
  }

  loadResult = () => {
    var results = []

    fetch('/locations')
      .then(res => res.json())
      .then(locations => {
        this.setState({ resultLocations: locations})
        locations.forEach((location, idx) => {
          var query = `/locations/search?id=${location.id}`;
            
          var qaList = [];
          fetch(query).then(res => res.json())
          .then(data => {
            data.forEach(qa => {
              qaList.push({ question: qa.question, answer: qa.answer })
            })
          }).catch(err => console.log(err));

          setTimeout(() => {
            var res = 
            <ExpansionPanel key={idx}>

              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={{flexBasis: '70.33%'}}>
                  <Typography style={{color: '#483D8B'}}> {location.street}</Typography>
                  <Typography style={{color: '#483D8B'}}> {location.city}, {location.state} {location.zipcode}, {location.country}</Typography>
                </div>
                <div style={{flexBasis: '33.33%'}}><Typography style={{color: '#A9A9A9'}}> duration: {location.duration} mins</Typography></div>
              </ExpansionPanelSummary>
              
              <ExpansionPanelDetails>
                <div style={{margin: '0 auto 0 auto'}}>
                  <List>
                    {qaList.map((qa,idx) => {
                      return <PaperSheet key={idx} qa={qa} locationId={location.id} />
                    })}
                  </List>
                </div>
              </ExpansionPanelDetails>

            </ExpansionPanel>
          
            results.push(res);
          }, 1000);
        })
      })
      .catch(err => console.log(err))

      setTimeout(() => {
        this.setState({
          resultComponent: results
        })
      }, 2500)
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
      this.setState({selectedLocations : []}, () => {
        this.loadResult();
        this.loadLocationList();
      });
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

    this.loadResult();
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
    displayList.forEach(location => {
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
    this.loadResult();
    this.loadLocationList();
  }

  render() {
    return (
      <div style={style}>
        <Manager username={this.props.match.params.username}/>
        <br/>

        <div className='locationlist'>
          <Grid container justify='center'>
            <Grid item xs={7} style={{marginRight: '20px'}}>
              <div className="manager-location-list">
                <br/>
                <h1>Locations list</h1>
                {this.state.locationTable}
              </div>
            </Grid>
            <Grid item xs={4} >
              <div className='manager-map'>
                <br/> <h1>Map</h1> <br/>
                {this.state.locationMap}
              </div>
            </Grid>
          </Grid>                    

          <Grid container justify='center'>
            <Grid item xs={5} style={{marginRight: '15px'}}>
              <Grid container spacing={8} alignItems="flex-end" style={{marginTop: '40px'}}>
                <Grid item> <AddLocation/></Grid>
                <Grid item> <h1>Add location</h1></Grid>

                <TextField
                          id='street'
                          className = 'street'
                          label='Enter street'
                          style={{minWidth: '80%'}}
                          onChange={this.handleTFchange} />
                <TextField
                          id='city'
                          className = 'city'
                          label='Enter city'
                          style={{minWidth: '80%'}}
                          onChange={this.handleTFchange} />
                <TextField
                          id='state'
                          className = 'state'
                          label='Enter state'
                          style={{minWidth: '80%'}}
                          onChange={this.handleTFchange} />
                <TextField
                          id='zipcode'
                          className = 'zipcode'
                          label='Enter zipcode'
                          style={{minWidth: '80%'}}
                          onChange={this.handleTFchange} />
                <TextField
                          id='country'
                          className = 'country'
                          label='Enter country'
                          style={{minWidth: '80%'}}
                          onChange={this.handleTFchange} />
                <TextField
                          id='duration'
                          className = 'duration'
                          label='Enter duration'
                          style={{minWidth: '80%'}}
                          onChange={this.handleTFchange} />

                <Button onClick={this.handleAddLocation} variant="contained" color="primary" style={{marginTop: '50px'}} > Add new location </Button>
              </Grid>
              
            </Grid>

            <Grid item xs={5} >
              <Grid container spacing={8} alignItems="flex-end" style={{marginTop: '40px'}}>
                <Grid item> <ListAlt/></Grid>
                <Grid item> <h1>Results</h1></Grid>
              </Grid>
              <Grid container spacing={8} style={{marginTop:'20px', marginBottom: '20px'}}>
                <div style={{width: '100%'}}>
                  {this.state.resultComponent}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
}

export default ManagerLocationsList;

