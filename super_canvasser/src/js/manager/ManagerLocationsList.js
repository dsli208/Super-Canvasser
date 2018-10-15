import React from 'react';
import Typography from '@material-ui/core/Typography';
import locations from '../../data/locations.json';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import MyMap from '../../api/MyMapComponent';


class ManagerLocationsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      locationRow: []
    }
  }
  componentDidMount() {
    this.setState({
      locations: locations.locations
    },() => {
      var locationsList = []
      {this.state.locations.map(location => {
        var row = <ul>
          <li>{location}</li>
        </ul>
        locationsList.push(row)
      })}
      this.setState({
        locationRow: locationsList
      })
    })
  }
  render() {
    return (
      <div>
        <Manager/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              {this.state.locationRow}
            </Grid>
            <Grid item xs={6}>
              <MyMap/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
}

export default ManagerLocationsList;

