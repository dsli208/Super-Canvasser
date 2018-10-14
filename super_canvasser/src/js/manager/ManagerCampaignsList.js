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
import campaigns from '../../data/campaigns.json';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';


function logout() {
  window.location.href = "/";
};

function CampaignRow(campaign) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography ><h1>{campaign.name}</h1></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Typography>
              <h3>Overview of assigned tasks</h3>
              <ul>
                {campaign.tasks.map(task => {
                  return (
                    <li>
                      Task {task.id} <br/>
                      Locations: 
                      <ul>
                        {task.locations.map(location => {
                          return (<li> {location} </li>)
                        })}
                      </ul>
                      Canvasser: {task.canvasser} <br/>
                    </li>
                  )
                })}
              </ul>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>
              <h3>List of questions</h3>
              <ul>
                {campaign.questions.map(question => {
                  return (<li> {question} </li>)
                })}
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

class ManagerCampaignsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaigns: [],
      campaignRow: []
    }
  }
  componentDidMount() {
    this.setState({
      campaigns: campaigns.campaigns
    },() => {
      var campaignsList = []
      {this.state.campaigns.map(campaign => {
        var row = <CampaignRow key={campaign.id} {...campaign}/>
        campaignsList.push(row)
      })}
      this.setState({
        campaignRow: campaignsList
      })
    })
  }
  render() {
    return (
      <div>
        <Manager/>
        <div>
          {this.state.campaignRow}
        </div>
      </div>
    );
  };
}

export default ManagerCampaignsList;

