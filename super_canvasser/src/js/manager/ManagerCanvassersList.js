import React from 'react';
import Manager from './Manager';
import canvasserAssignments from '../../data/canvasserAssignments';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

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

class PaperSheet extends React.Component {
  state = {
    isDelete_open: false
  }
  handleDelete = () => {
    console.log('delete assignment');
    this.setState({ isDelete_open: false })
  }
  render() {
    const {classes, assignment} = this.props;
    
    return (
      <Paper className={classes.root} elevation={1}>
        <div justify='center'>
          <Typography variant='headline'>
            <strong>Task {assignment.taskName}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {assignment.date}
          </Typography>
          
          {assignment.locations.map((locationData, index) => {
            console.log(locationData);
            return (
            <div key={index}>
              <Typography><strong style={{color: '#DC143C'}}>Location:</strong> {locationData.fullAddress} &nbsp;&nbsp;&nbsp; <span style={{color: '#A9A9A9'}} > Duration: {locationData.duration} mins </span> </Typography>
              {locationData.qaList.map((qa, idx) => {
                return (
                  <div key={idx} style={{marginBottom: '15px'}}>
                    <Typography><strong>Question:</strong> {qa.question} </Typography>
                    <Typography><strong>Answer:</strong> {qa.answer} </Typography>
                  </div>
                )
              })}
            </div>
            )
          })}

          <Button 
            onClick={() => this.setState({isDelete_open : true})} 
            color="primary" 
            className={classes.button}> Delete </Button>

            {/* ---------------------- modal for delete question -------------------------- */}
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.isDelete_open}
              onClose={() => this.setState({isDelete_open : false})}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Grid container justify='center' >
                  <Typography variant='subheading'>
                    Are you sure you want to delete this canvas assignment?
                  </Typography>
                </Grid>
                <br/>
                <Grid container justify='center'>
                  <div><br/><Button 
                                onClick={this.handleDelete} 
                                variant="contained" 
                                color="primary" 
                                style={{marginTop:'15px', marginRight: '8px'}}> Yes, delete </Button></div>
                  <div><br/><Button 
                                onClick={() => this.setState({isDelete_open: false})} 
                                variant="contained" 
                                color="default" 
                                style={{marginTop:'15px'}}> No, cancel </Button>
                  </div>
                </Grid>
              </div>
            </Modal>
        </div>
      </Paper>
    )
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

PaperSheet = withStyles(paper_styles)(PaperSheet);



class ManagerCanvassersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvassers: [],
      dataIsFetched: false,
    }
  }
  
  componentDidMount() {
    this.componentInit();
  }

  componentInit = () => {
    fetch('/users/role/canvasser').then(res => res.json())
    .then(canvassers => {
      var canvasserList = [];
      canvassers.forEach((canvasser) => {
        var canvasserInfo = {};
        canvasserInfo['userInfo'] = canvasser;
        var listAssignment = [];

        var query = `/users/canvasser/assignments/${canvasser.id}`;
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
          canvasserInfo['assignments'] = listAssignment;
          canvasserList.push(canvasserInfo);
          //console.log(canvasserInfo);
        },1300)
      })
      setTimeout(() => {
        this.setState({
          canvassers: canvasserList,
          dataIsFetched: true,
        })
      }, 1400) 
    })
    .catch(err => console.log(err))
  }


  render() {
    const {canvassers} = this.state;
    return (
      <div>
      {!this.state.dataIsFetched ? null : 
        <div style={style}>
        <Manager username={this.props.match.params.username}/>
        <br/><br/>
        <div className="canvasserlist" style={{margin: '0 15% 30px 15%'}} >
          <h1>Canvasser Assignments</h1> <br/>
          <Typography>Canvas assignments for each canvasser (including tasks with corresponding date and set of locations along with questions).</Typography>
          <br/><br/>
          
          {canvassers.map((canvasser, idx) => {
              //console.log(canvasser)
            
              var assignList = canvasser.assignments;
            
              return (
                <ExpansionPanel key={idx}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div style={{flexBasis: '50%'}}>
                      <Typography variant='subheading' style={{color: '#483D8B'}}> {canvasser.userInfo.firstName} {canvasser.userInfo.lastName}</Typography>
                      <Typography variant='subheading' style={{color: '#A9A9A9'}}> @{canvasser.userInfo.username} | {canvasser.userInfo.role} </Typography>
                    </div>
                    <div style={{flexBasis: '50%'}}>
                      <Typography style={{color: '#A9A9A9'}}> Email: {canvasser.userInfo.email} </Typography>
                      <Typography style={{color: '#A9A9A9'}}> Phone number: {canvasser.userInfo.phone} </Typography>
                    </div>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <div style={{margin: '0 auto 0 auto'}} >
                      <List>
                        {assignList.map((assignment, idx) => {
                          return (
                            <PaperSheet key={idx} assignment={assignment} />
                          )
                        })}
                      </List>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
          })}
        </div>
      </div>
      }
      </div>
    )
    
  };
}

export default ManagerCanvassersList;

