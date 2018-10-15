import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {AccountCircle} from '@material-ui/icons';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      day_duration: 0,
      avg_speed_travel: 0
    };
  }
}



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
            Admin
          </Typography>
          <Button color="inherit">Tasklist(Addresses and Details)</Button>
          <Button color="inherit">Freedays</Button>
          <Button onClick={logout} color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);