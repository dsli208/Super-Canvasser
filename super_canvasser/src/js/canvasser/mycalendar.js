import React from 'react';
import 'react-web-tabs/dist/react-web-tabs.css';

import '../../css/manager.css';
import {Component} from "react"
import BigCalendar from 'react-big-calendar'
import moment from "moment"

import Canvasser from './Canvasser';

BigCalendar.momentLocalizer(moment);





const MyCalendar = props => (
    <div>
    <BigCalendar
    events={[]}
    startAcessor='startDate'
    endAccessor='endDate'
    />
    </div>
);

export default MyCalendar
