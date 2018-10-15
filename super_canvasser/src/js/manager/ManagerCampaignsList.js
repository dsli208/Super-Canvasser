import React from 'react';
import Typography from '@material-ui/core/Typography';
import campaigns from '../../data/campaigns.json';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

function CampaignRow(campaign) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <h1>{campaign.name}</h1>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <h3>Overview of assigned tasks</h3>
            <ul>
              {campaign.tasks.map((task, idx) => {
                return (
                  <li key={idx}>
                    Task {task.id} <br/>
                    Locations: 
                    <ul>
                      {task.locations.map((location, idx) => {
                        return (<li key={idx}> {location} </li>)
                      })}
                    </ul>
                    Canvasser: {task.canvasser} <br/>
                  </li>
                )
              })}
            </ul>
          </Grid>

          <Grid item xs={6}>
            <h3>List of questions</h3>
            <ul>
              {campaign.questions.map((question, idx) => {
                return (<li key={idx}> {question} </li>)
              })}
            </ul>
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

