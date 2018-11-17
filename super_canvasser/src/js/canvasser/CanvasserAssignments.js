import React from 'react';
import Canvasser from './Canvasser';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ReactStars from 'react-stars';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {LocationOn} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};


const paper_styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50 + 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});



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
        //ref={(map) => map && map.fitBounds(this.props.bounds)}
        >
          
          {/* {this.props.listLocations.map((coord,idx) => 
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
          )} */}
          
        </GoogleMap>
      
    )
  }
}

GoogleMapExample = withGoogleMap(GoogleMapExample);



class PaperSheet extends React.Component {
  
  handleTFChange = () => {

  }

  render() {
    const {classes, assignment} = this.props;

    return (
      <Paper className={classes.root} elevation={1} style={{marginBottom: '10px'}}>
        <div justify='center'>
          <Typography variant='headline'>
            <strong>Task {assignment.taskName}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {assignment.date}
          </Typography>
          
          {assignment.locations.map((locationData, index) => {
            //console.log(locationData);
            return (
            <div key={index} style={{marginBottom: '10px'}}>
              <Grid container spacing={8} alignItems="center">
                <Grid item>
                  <Tooltip title="Display location">
                    <IconButton aria-label="Location">
                      <LocationOn color='secondary'/>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <strong>
                    {locationData.fullAddress} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style={{color: '#A9A9A9'}} > Duration: {locationData.duration} mins </span> 
                  </strong>
                </Grid>
              </Grid>
              {locationData.qaList.map((qa, idx) => {
                return (
                  <div key={idx} style={{marginBottom: '15px'}}>
                    <Typography><strong>Question:</strong> {qa.question} </Typography>
                    <Typography><strong>Answer:</strong> </Typography>
                    <TextField
                        onChange={this.handleTFChange}
                        multiline={true}
                        fullWidth={true}
                        defaultValue={qa.answer}
                        />
                    <Button 
                        style={{marginTop: '5px'}}
                        variant='contained'
                        color='default'
                        className={classes.button}> Save </Button>
                  </div>
                )
              })}
              
              <Grid container >
                <Grid item xs={6} >
                  <Grid container justify='center' style={{marginBottom: '15px'}}>
                    <TextField
                        label='Notes'
                        multiline={true}
                        style={{width: '90%'}}
                        rows={5} />
                  </Grid>

                  <Grid container alignItems='flex-end' justify='center' style={{marginBottom: '15px'}}>
                    <Grid item>
                      <Typography> 
                        <strong>Rate:</strong> &nbsp;&nbsp;&nbsp;
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ReactStars
                          count={5}
                          onChange={(rate) => console.log(rate)}
                          size={20}
                          color2={'#ffd700'} />
                    </Grid>
                  </Grid>
                  
                  <Grid container justify='center' style={{marginBottom: '15px'}}>
                    <Button 
                      variant='contained'
                      color='primary'
                      className={classes.button}> Save </Button>
                  </Grid>
                </Grid>

                <Grid item xs={5} >
                  <GoogleMapExample
                      containerElement={ <div style={{ height: `300px`, width: '100%' }} /> }
                      mapElement={ <div style={{ height: `100%` }} /> }
                  />
                </Grid>
              </Grid>
            </div>
            )
          })}

        </div>
      </Paper>
    )
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

PaperSheet = withStyles(paper_styles)(PaperSheet);


class CanvasserAssignments extends React.Component {
  state = {
    currentUsername: this.props.match.params.username,
    canvasserInfo: null,
    canvasserData: null,
    mainComponent: null,
  }

  componentDidMount() {
    // load canvasser info
    const {currentUsername} = this.state;
    var query = `/users/${currentUsername}`;
    fetch(query).then(res => res.json())
    .then(canvasser => {
      this.setState({
        canvasserInfo: canvasser[0]
      }, () => this.componentInit()) 
    })
    .catch(err => console.log(err))
  }

  renderMainComponent = () => {
    this.setState({
      mainComponent: <div style={{margin: '0 auto 0 auto'}} >
        <List>
          {
            this.state.canvasserData === null ? null :
            <div>
              {this.state.canvasserData.assignments.map((assignment, idx) => {
                return (
                  <PaperSheet key={idx} assignment={assignment} />
                )
              })}
            </div>
          }
          
        </List>
      </div>
    })
  }


  componentInit = () => {
    const {canvasserInfo} = this.state;
    var info = {};
    info['userInfo'] = canvasserInfo;
    var listAssignment = [];

    var query = `/users/canvasser/assignments/${canvasserInfo.id}`;
    fetch(query).then(res => res.json())
    .then(data => {
      //console.log('data: ', data)
      
      data.forEach(task => {
        var assignment = {}
        if (task.taskId !== null) {
          //console.log(task)
          assignment['date'] = task.month + '/' + task.date + '/' + task.year;
          assignment['taskName'] = task.taskId;
          assignment['locations'] = [];

          var query = `/users/canvasser/tasks/${task.taskId}`;
          fetch(query).then(res => res.json())
          .then(taskInfo => {
            taskInfo.forEach(locationInfo => {
              var locationDict = {};
              //console.log(locationInfo)
              fetch(`/locations/searching/${locationInfo.locationId}`)
              .then(res => res.json())
              .then((location) => {
                locationDict['fullAddress'] = location[0].fullAddress;
                locationDict['duration'] = location[0].duration;
                locationDict['qaList'] = [];

                var sql = `/locations/search?locationId=${locationInfo.locationId}`;
                fetch(sql).then(res => res.json())
                .then(locationList => {
                  locationList.forEach((locationQA) => {
                    var qa = {}
                    qa['question'] = locationQA.question;
                    qa['answer'] = locationQA.answer;
                    locationDict['qaList'].push(qa);
                  })
                }).catch(err => console.log(err))
              }).catch(err => console.log(err))
              
              setTimeout(() => {
                assignment['locations'].push(locationDict);
              }, 1000)

            })
          }).catch(err => console.log(err))
          setTimeout(() => {
            listAssignment.push(assignment);  
          }, 1200);
        }
      })
    })
    .catch(err => console.log(err))

    setTimeout(() => {
      info['assignments'] = listAssignment;
    },1000)

    setTimeout(() => {
      this.setState({
        canvasserData: info
      }, () => {
        this.renderMainComponent()
      })
    },1500)
  }

  render() {
    return (
      <div style={style}>
        <Canvasser username={this.props.match.params.username} />
        <br/><br/>
        <div className="canvasserlist" style={{margin: '0 15% 30px 15%'}} >
          <h1>Canvasser Assignments</h1> <br/>
          {this.state.mainComponent}
        </div>
      </div>
    )
  }
}

export default CanvasserAssignments;