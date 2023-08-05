import { useParams, Link } from "react-router-dom";
import './ScheduleDetail.css';

export default function Info(props) {
    let colorPerPercent = ['green', 'lightgreen', 'yellow', 'orange', 'red'];

    let params = useParams();
    let schedule = props.scheduleArray;
    let getCurrentSchedule = (id) => {
        return schedule.find(
            (res) => res.schedule_id === id
        );
    }
    let currentID = parseInt(params.scheduleID, 10);
    let currentSchedule = getCurrentSchedule(currentID);

    return (
        <div className="ScheduleDetail">
            <div className="BackButtonArea">
                <a className="BackButton"><Link to='/schedule'>{'<'} Go back to previous page</Link></a>
            </div>

            <div className="CongestionInfo">
                <div className="ImageBox">
                    <div className='Icon'>
                        <div className="ScheduleImage">
                            <img height={'250'} src={(currentSchedule.googlemap_id.toString().length < 10) ? currentSchedule.schedule_image : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${currentSchedule.schedule_image}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} />
                        </div>
                    </div>
                </div>
                <div className="InformationArea">
                    <div>
                        <a className="InformationAreaTitle">Current Congestion Level</a>
                    </div>
                    <div className="CongestionInformationArea">
                        <div className="CongestionInfoElements">
                            <div style={{flexGrow: '2'}}>
                                <div style={{marginTop: '30px', marginBottom: '-40px'}}>
                                    <table className="Table">
                                        <tr>
                                            <th>Currently Available Seats</th>
                                            <th>{ Math.round(currentSchedule.capacity * currentSchedule.congestion) }</th>
                                        </tr>
                                        <tr>
                                            <th>Total Seats</th>
                                            <th>{ currentSchedule.capacity }</th>
                                        </tr>
                                        { (currentSchedule.congestion == 1) ? (<tr> <th>Wait Time</th> <th> {10 * Math.floor(currentSchedule.capacity / 10)} min</th> </tr>) : <div> </div> }
                                    </table>
                                </div>
                            </div>
                            <div className="ReservationButtonDiv">
                                <button className="Button" id="reservation_button">Make Reservation</button>
                            </div>
                        </div>
                        <div className="donut"
                            id="bigDonut"
                            style={{background: 
                            `conic-gradient(
                                ${colorPerPercent[Math.ceil(currentSchedule.congestion * 5) - 1]} 0deg 
                                ${currentSchedule.congestion * 360}deg, lightgrey 
                                ${currentSchedule.congestion * 360}deg 360deg)`}}
                        >
                            <div className="hole" id="bigHole" style={{backgroundColor: 'rgb(237, 237, 237)'}}>
                                <div className="HoleText">
                                    <a style={{fontWeight: 'bold'}}>{Math.floor(currentSchedule.congestion * 100)}%</a>
                                    <a>{Math.round( currentSchedule.capacity * currentSchedule.congestion )} / {currentSchedule.capacity}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div>
                <h2 className="basic_information">Basic Information</h2>
                <div className="info">
                    <table className="basic_table" align="center">
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>{ currentSchedule.schedule_name }</td>
                            </tr>
                            <tr>
                                <th>Telephone Number:</th>
                                <td>{ currentSchedule.phone_number }</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{ currentSchedule.schedule_address }</td>
                            </tr>
                            <tr>
                                <th>Opening Time:</th>
                                <td>{ currentSchedule.opening_time } ~ { currentSchedule.closed_time }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='PageLinks'>
                    <ul className="NavLinks" style={{marginTop: '20px'}}>
                        <li><Link to='/schedule'>Go back to List</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
