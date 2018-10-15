import React from 'react';
import locations from '../../data/locations.json';
import '../../css/manager.css';
import Manager from './Manager';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableLocations from './TableLocations';
import MyMap from '../../api/MyMapComponent';

class ManagerLocationsList extends React.Component {
  render() {
    return (
      <div>
        <Manager/>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <div className="manager-location-list">
                <br/>
                <h1>Locations list:</h1>
                <TableLocations/>
              </div>
            </Grid>
            <Grid item xs={5} >
              <div clssName='manager-map'>
                <br/> <h1>Map</h1> <br/>
                <MyMap className="locations-map"/>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
}

export default ManagerLocationsList;

