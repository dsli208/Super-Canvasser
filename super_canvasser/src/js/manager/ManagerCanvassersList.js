import React from 'react';
import '../../css/manager.css';
import Manager from './Manager';
import TableCanvassers from './TableCanvassers';
import 'react-web-tabs/dist/react-web-tabs.css';


const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

class ManagerCanvassersList extends React.Component {
  render() {
    return (
      <div style={style}>
        <Manager/>
        <br/><br/>
        <div className="canvasserlist">
          <h1>Canvassers details</h1>
          <TableCanvassers />            
        </div>
      </div>
    );
  };
}

export default ManagerCanvassersList;

