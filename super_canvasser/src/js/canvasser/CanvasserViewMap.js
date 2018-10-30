import React from 'react';
import MapUsers from './MapUsers';
import 'react-web-tabs/dist/react-web-tabs.css';
import Canvasser from './Canvasser';



const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

class CanvasserViewMap extends React.Component {
  render() {
    return (
      <div style={style}>
        <Canvasser/>
        <br/>
        <div>
          
        </div>
      </div>
    );
  };
}

export default CanvasserViewMap;

