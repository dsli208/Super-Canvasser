/* global gapi */
/* global initClient */
/* global updateSigninStatus */
/* global updateSigninStatus */
/* global handleAuthClick */
/* global handleSignoutClick */
/* global listUpcomingEvents */
/* global appendPre */
/* global i */


import React , { Component }from 'react';
import 'react-web-tabs/dist/react-web-tabs.css';


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


<button id="authorize_button" style="display: none;">Authorize</button>;
    <button id="signout_button" style="display: none;">Sign Out</button>;
    <pre id="content"></pre>;

    let CLIENT_ID = '<811006792102-tsfs533g9musjb9jusa037j9boj5fdoo.apps.googleusercontent.com>';
    let API_KEY = '<AIzaSyAELfJ04wWlUz2tPbTczUsBwt3PMk2j4Ho>';
      let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
      let SCOPES = "https://www.googleapis.com/auth/calendar";
      let authorizeButton = document.getElementById('authorize_button');
      let signoutButton = document.getElementById('signout_button');

class MyCalendarComponent extends React.Component {

    constructor() {
        super();
    }

   handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
   initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }
   updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }
   handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }
   handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
   appendPre(message) {
    let pre = document.getElementById('content');
    let textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
   listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
    let events = response.result.items;
      appendPre('Upcoming events:');

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
        let event = events[i];
          let when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }
    });
  }






}

export default MyCalendarComponent;
