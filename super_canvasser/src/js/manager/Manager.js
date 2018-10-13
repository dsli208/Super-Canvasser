import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from '@material-ui/icons';
import {BrowserRouter, Route } from 'react-router-dom';


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

function logout() {
  window.location.href = "http://localhost:3000";
};

function Manager(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <AccountCircle />
          </IconButton>
          <Typography color="inherit" className={classes.grow}>
            Manager
          </Typography>
          <Button color="inherit">Campaigns</Button>
          <Button color="inherit">Dates</Button>
          <Button color="inherit">Canvassers</Button>
          <Button color="inherit">Locations</Button>
          <Button color="inherit">Questions</Button>
          <Button color="inherit">Talking points</Button>
          <Button onClick={logout} color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Manager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Manager);