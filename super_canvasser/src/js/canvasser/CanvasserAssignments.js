import React from 'react';
import Canvasser from './Canvasser';
//import InfiniteCalendar from 'react-infinite-calendar';

import InfiniteCalendar, {
  Calendar,
  withDateSelection,
  withKeyboardSupport,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
});


var currentDate = '';

class CanvasserAssignments extends React.Component {
  state = {
    currentUsername: this.props.match.params.username,
    canvasserInfo: {},
    currentSelect: '',
    dateList: [],
    freeDatesComponent: null,
  }

  componentDidMount() {
    const {currentUsername} = this.state;
    var query = `/users/${currentUsername}`;
    fetch(query).then(res => res.json())
    .then(canvasser => {
      this.setState({
        canvasserInfo: canvasser[0]
      }, () => this.loadDateList()) 
    })
    .catch(err => console.log(err))
  }

  loadDateList = () => {
    const {canvasserInfo} = this.state;
    var query = `/users/canvasser/assignments/${canvasserInfo.id}`;
    fetch(query).then(res => res.json())
    .then(dateList => {
      this.setState({ 
        dateList : dateList
      }, () => {
        var j = 0;
        this.setState({
          freeDatesComponent: <List >
            {this.state.dateList.map((date, idx) => {
              var displayDate = date.month + '/' + date.date + '/' + date.year;
              if (date.taskId !== null) {
                return null;
              }
              j++;
              return (
                <ListItem key={idx} style={{width: '95%', backgroundColor: (j%2==0) ? '#ffffff' : '#DEDBFA' }}>
                  
                  <ListItemText
                    primary={displayDate}
                  />
                  <ListItemSecondaryAction style={{marginRight: '5%'}}>
                    <Button onClick={() => this.deleteFreeDate(date)} aria-label="Delete" >
                      <DeleteIcon /> Delete
                    </Button>
                  </ListItemSecondaryAction>

                </ListItem>
              )
            })}
          </List>
        })
      })
    })
    .catch(err => console.log(err))
  }

  deleteFreeDate = (selectDate) => {
    const {canvasserInfo} = this.state;
    var date = selectDate.date;
    var year = selectDate.year;
    var month = selectDate.month;
    
    var query = `/users/canvasser/deleteFreeDate?userId=${canvasserInfo.id}&date=${date}&month=${month}&year=${year}`;
    fetch(query).then(result => result.json()).catch(error => console.log(error))

    // reload free dates component
    setTimeout(() => {
      this.loadDateList();
    }, 500)
  }

  addFreeDate = () => {
    const {canvasserInfo} = this.state;
    this.setState({
      currentSelect: currentDate
    }, () => {
      var date = this.state.currentSelect.getDate();
      var year = this.state.currentSelect.getFullYear();
      var month = this.state.currentSelect.getMonth() + 1;
      
      var query = `/users/canvasser/addFreeDate?userId=${canvasserInfo.id}&date=${date}&month=${month}&year=${year}`;
      fetch(query).then(result => result.json()).catch(error => console.log(error))

      // reload free dates component
      setTimeout(() => {
        this.loadDateList();
      }, 500)
    })
  }

  render() {
    const { classes } = this.props;
    const {dateList} = this.state;

    var j = 0;
    var busyDates = [];
    dateList.forEach(day => {
      if (day.taskId !== null) {
        var y = day.year;
        var m = day.month - 1;
        var d = day.date;
        busyDates.push(new Date(y, m, d));
      }
    })
    //console.log(busyDates);

    // Render the Calendar
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    
    return (
      <div style={style}>
        <Canvasser username={this.props.match.params.username}/>
        
        <Grid container justify='center' style={{margin: '0 auto 30px auto'}}>
            <Grid item xs={(window.innerWidth < 650) ? 12 : 5} style={{marginTop: '35px', marginBottom: '50px'}} >
              <Grid container spacing={8} alignItems="center" style={{marginBottom: '20px'}}>
                <Grid item>
                  <h1 style={{fontWeight: 'bold', marginRight: '10px'}}> Calendar </h1>
                </Grid>
                
                <Grid item>
                  <Tooltip title="Add">
                    <Button onClick={this.addFreeDate} variant='fab' color='secondary' aria-label="Add" >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>

              <InfiniteCalendar
                width={ (window.innerWidth < 650) ? window.innerWidth : 0.35*window.innerWidth}
                height={400}
                disabledDates={busyDates}
                selected={today}
                minDate={lastWeek} 
                Component={withDateSelection(withKeyboardSupport(Calendar))}
                onSelect={(date) => {
                  currentDate = date;
                }} />
            </Grid>

            <Grid item xs={(window.innerWidth < 650) ? 12 : 3} style={{marginTop: '35px'}} >
              <Grid container spacing={8} alignItems="center" >
                <Grid item >
                  <h1 style={{fontWeight: 'bold'}}> Available dates </h1>
                </Grid>
                
                <Grid container style={{marginTop: '10px'}}>
                  <br/>
                  <div className={classes.root}>
                    <div className={classes.demo}>
                      {this.state.freeDatesComponent}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={(window.innerWidth < 650) ? 12 : 3} style={{marginTop: '35px', marginLeft: '15px'}} >
              <Grid container spacing={8} alignItems="center" >
                <Grid item >
                  <h1 style={{fontWeight: 'bold'}}> Scheduled dates </h1>
                </Grid>

                <Grid container style={{marginTop: '10px'}} >
                  <br/>
                  <div className={classes.root}>
                    <div className={classes.demo}>
                      <List >

                        {this.state.dateList.map((date, idx) => {
                          var displayDate = date.month + '/' + date.date + '/' + date.year;
                          var task = 'Task ' + date.taskId;
                          if (date.taskId === null) {
                            return null;
                          }
                          j++;
                          return (
                            <ListItem key={idx} style={{backgroundColor: (j%2==0) ? '#ffffff' : '#DEDBFA' }}>
                              
                              <ListItemText
                                primary={displayDate}
                              />

                              <ListItemSecondaryAction>
                                <strong> {task} &nbsp;&nbsp;&nbsp;&nbsp; </strong>
                              </ListItemSecondaryAction>

                            </ListItem>
                          )
                        })}
                      </List>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>

        </Grid>

      
      </div>
    )
  }
}

export default withStyles(styles)(CanvasserAssignments);