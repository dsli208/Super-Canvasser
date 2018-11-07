import React from 'react';
import Manager from './Manager';
import '../../css/App.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {QuestionAnswer} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';


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
});

const modal_styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

class PaperSheet extends React.Component {
  render() {
    const { classes, qa } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
            <div justify='center'>
              <Typography>
                <strong>Question:</strong> {qa.question}
              </Typography>
              <Typography>
                <strong>Answer:</strong> {qa.answer}
              </Typography>
            </div>   
          <Button color="primary" className={classes.button}> Update </Button>
          <Button color="primary" className={classes.button}> Delete </Button>
        </Paper>
      </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

PaperSheet = withStyles(paper_styles)(PaperSheet);



class LocationRow extends React.Component {
  state = {
    locationId: this.props.locationData.locationId,
    isOpen: false,
    isChanged: false,
    addSuccess: false,
    isFilled: true,
    questionTobeAdd: '',
    qaComponent: null,
  }

  addQuestion = () => {
    var question = this.state.questionTobeAdd;
    if (question.length === 0) {
      console.log('Please enter a question!');
      this.setState({isFilled: false, addSuccess: false})
      setTimeout(() => {
        this.setState({ addSuccess: false,  })
      }, 2000);
      return;
    }
    this.setState({isFilled: true, addSuccess: true}, () => {
      question = question.replace(/ /g, '+');
      var query = '/locations/' + this.state.locationId + '/questions/add';
      query += `?question=${question}&answer=`;
      // perform query add question
      fetch(query).then(res => res.json()).catch(err => console.log(err));
      console.log('Add question successfully');
      this.props.reload();
    })
    setTimeout(() => {
      this.setState({ isOpen: false, addSuccess: false,  questionTobeAdd: ''})
    }, 2000);

  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleTFChange = (event) => {
    this.setState({questionTobeAdd: event.target.value})
  }

  render() {
    const { locationData, classes} = this.props;
    
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
          <div>
            <List>
              {locationData.qaList.map((data,idx) => {
                return <PaperSheet key={idx} qa={data} />
              })}
              <Button 
                onClick={() => this.setState({isOpen: true, addSuccess: false, isFilled: true}) }
                variant="contained" 
                color="primary" 
                style={{marginTop: '10px'}} >
                + Add question
              </Button>
            </List>
            {/*--------------------- modal for add question --------------------- */}
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.isOpen}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Grid container justify='center'>
                  <Typography variant='display2' id="modal-title">
                    Add new question
                  </Typography>
                </Grid>
                <Grid container justify='center'>
                  <TextField
                      onChange={this.handleTFChange}
                      className = 'question'
                      label='Enter question'
                      style={{minWidth: '80%'}} />
                </Grid>
                <Grid container justify='center'>
                  {this.state.addSuccess ?
                    <FormHelperText id="component-success-text">New question just added successfully!</FormHelperText> :null}
                  {this.state.isFilled ? 
                    null : <FormHelperText id="component-error-text">Please fill in the question!</FormHelperText> }
                </Grid>
                <Grid container justify='center'>
                  <Button onClick={this.addQuestion} variant="contained" color="primary" style={{marginTop: '30px', marginRight: '15px'}} > Add </Button>
                  <Button onClick={()=>this.setState({isOpen:false})} variant="contained" color="default" style={{marginTop: '30px'}} > Close </Button>
                </Grid>
              </div>
            </Modal>
          </div>
        </ExpansionPanelDetails>
        
      </ExpansionPanel> 
    )
  }
}

LocationRow = withStyles(modal_styles)(LocationRow);

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
      var row = <LocationRow key={idx} locationData={locationData} reload={this.reload}/>
      locationQA.push(row);
    })
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
            // perform search all questions and answer at this location
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