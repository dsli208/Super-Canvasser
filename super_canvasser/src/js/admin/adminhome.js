import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Login from './Login';
import Register from './Register';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from '@material-ui/icons';
import {BrowserRouter, Route } from 'react-router-dom';
import ReactTable from "react-table";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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

  function AddUser() {

  }
  function editUser() {

  }

  function render() {
    const data = [];
  
    const columns = [{
      Header: 'User ID',
      accessor: 'id' // String-based value accessors!
    }, {
      Header: 'Name',
      accessor: 'name',
      //Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'User Type', // Required because our accessor is not a string
      Header: 'type',
      //accessor: d => d.friend.name // Custom value accessors!
    }, { // How to put in the edit and delete buttons?
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }]
  }

  function Admin(props) {
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
            
            <Button onClick={logout} color="inherit">Log out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  