import React from 'react';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TableQuestions from './TableQuestions';
import {QuestionAnswer} from '@material-ui/icons';

const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

class LocationRow extends React.Component {
  render() {
    const { locationData} = this.props;
    console.log(locationData.qaList);
    return (
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div style={{flexBasis: '70.33%'}}>
            <Typography variant='subheading' style={{color: '#483D8B'}}> {locationData.street}</Typography>
            <Typography variant='subheading' style={{color: '#483D8B'}}> {locationData.city}, {locationData.state} {locationData.zipcode}, {locationData.country}</Typography>
          </div>
          <div style={{flexBasis: '33.33%'}}><Typography style={{color: '#A9A9A9'}}> duration: {locationData.duration} mins</Typography></div>
        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails>
          <TableQuestions locationId={locationData.locationId} questionAnswer={locationData.qaList} load={this.props.load}/>
        </ExpansionPanelDetails>
        
      </ExpansionPanel> 
    )
  }
}

class ManagerQuestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationsQA: [],
      locationComponent: [],
    }
  }

  componentWillMount() {
    this.reload();
  }

  reload = () => {
    this.load();
    setTimeout(() => {
      this.startRender();
    }, 1000)
  }

  startRender = () => {
    //console.log(this.state.locationsQA);
    var locationQA = [];
    this.state.locationsQA.forEach((locationData, idx) => {
      var row = <LocationRow key={idx} locationData={locationData} load={this.reload}/>
      locationQA.push(row);
    })
    var old_state = this.state.locationComponent;
    this.setState({
      locationComponent: locationQA
    })
  }

  
  load = () => {
    var locationsQA = [];
  
    fetch('/locations')
      .then(res => res.json())
      .then(locations => {
        this.setState({ locations: locations }, () => {
          locations.forEach((location, idx) => {
            var query = `/locations/search?id=${location.id}`;
            
            var qaList = [];
            fetch(query).then(res => res.json())
            .then(data => {
              data.forEach(qa => {
                qaList.push({ question: qa.question, answer: qa.answer })
              })
            }).catch(err => console.log(err));

            locationsQA.push({
              locationId: location.id,
              fullAddress: location.fullAddress,
              street: location.street,
              city: location.city,
              state: location.state,
              zipcode: location.zipcode,
              country: location.country,
              duration: location.duration,
              qaList: qaList
            })
          })
        })
      })
      .catch(err => console.log(err))

    this.setState({
      locationsQA: locationsQA
    })
  }

  render() {
    return (
      <div style={style}>
        <Manager username={this.props.match.params.username}/>
        <div className="questionList" style={{margin: '30px 15% 30px 15%'}}>
          <Grid container alignItems='flex-end' justify='center' style={{marginBottom: '20px'}}>
            <Grid item style={{marginRight: '15px'}}>
              <QuestionAnswer/>
            </Grid>
            <Grid item>
              <h1>Questions details</h1>
            </Grid>
          </Grid>
          {this.state.locationComponent}           
        </div>
      </div>
    );
  };
}

export default ManagerQuestions;