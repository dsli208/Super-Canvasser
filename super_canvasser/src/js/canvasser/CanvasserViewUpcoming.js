import React from 'react';
import Canvasser from './Canvasser';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MyCalendar from '../../api/MyCalendarComponent';

const style = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
};

const field_style = {
   width: 300,
   color: "#ffffff",
};


class CanvasserViewUpcoming extends React.Component {
  render() {
    return (
      <div style={style}>
      <Canvasser/>
          <div className='canvasser-calendar'>
                    <br/> <h1>Calendar</h1> <br/>
                    <MyCalendar/>
          </div>
      </div>
  );
};

}


export default CanvasserViewUpcoming;
