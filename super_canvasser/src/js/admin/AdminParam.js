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



class AdminParam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          day_duration: 0,
          avg_speed_travel: 0
        };
    }


    render() {
        return(
            <div>
            <Admin/>
            <Grid item xs={12} container justify='center'>
            <form className="form" justify='center'>
               {/* user email text field */}
               <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item><Email/></Grid>
                  <Grid item>
                     <TextField
                        label='Duration of Work Day'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({day_duration:newValue})} />
                  </Grid>
               </Grid>

               {/*Speed of traveling*/}
               <Grid container spacing={8} alignItems="flex-end" justify='center'>
                  <Grid item><VpnKey/></Grid>
                  <Grid item>
                     <TextField
                        label='Average speed of traveling'
                        style={field_style}
                        onChange = {(event,newValue) => this.setState({avg_speed_travel:newValue})} />
                  </Grid>
               </Grid>
               <br/>
            </form>
         </Grid>
         </div>
        );
    }
}