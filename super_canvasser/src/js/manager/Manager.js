import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {AccountCircle} from '@material-ui/icons';
import currentUser from '../../data/currentUser';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Manager extends React.Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUserName: '',
      currentUserObj: '',
      currentUserFullName: '',
    }
  }
  
  componentDidMount() {
    this.setState({
      currentUserName: currentUser[0].username,
      currentUserObj: currentUser[0],
      currentUserFullName: currentUser[0].firstName + ' ' + currentUser[0].lastName
    })
  } 

  logout = () => {
    window.location.href = '/';
  }

  viewLocations = () => {
    window.location.href = '/users/manager/' + this.state.currentUserName + '/locations';
  }

  viewCanvassers = () => {
    window.location.href = '/users/manager/' + this.state.currentUserName + '/canvassers';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <AccountCircle />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
               {this.state.currentUserFullName}
            </Typography>
            <Button color="inherit">Campaigns</Button>
            <Button color="inherit">Dates</Button>
            <Button onClick={this.viewCanvassers} color="inherit">Canvassers</Button>
            <Button onClick={this.viewLocations} color="inherit">Locations</Button>
            <Button color="inherit">Questions</Button>
            <Button color="inherit">Talking points</Button>
            <Button onClick={this.logout} color="inherit">Log out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Manager.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Manager);