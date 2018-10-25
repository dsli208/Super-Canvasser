import React from 'react';
import TableUsers from './TableUsers';
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
          <TableUsers />
        </div>
      </div>
    );
  };
}

export default AdminViewUsers;

