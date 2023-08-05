import React from "react";
import './ScheduleDetail.css';
import { Link, Outlet } from 'react-router-dom';

class ScheduleDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    
    render () {
        return (
            <div style={{backgroundColor: 'rgb(237, 237, 237)'}}>
                <Outlet />
            </div>
        );
    }
}

export default ScheduleDetail;
