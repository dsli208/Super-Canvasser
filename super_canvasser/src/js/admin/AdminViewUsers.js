import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import TableCanvassers from '../manager/TableCanvassers';
import 'react-web-tabs/dist/react-web-tabs.css';
import Admin from './Admin';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

class AdminViewUsers extends React.Component {
  render() {
    return (
      <div style={style}>
        <Admin/>
        <br/>
        <div>
          <TableCanvassers />
        </div>
      </div>
    );
  };
}

export default AdminViewUsers;

