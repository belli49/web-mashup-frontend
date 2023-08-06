import { useParams, Link } from "react-router-dom";
import './ScheduleDetail.css';

export default function Info(props) {
    let colorPerPercent = ['green', 'lightgreen', 'yellow', 'orange', 'red'];

    let params = useParams();
    let schedule = props.scheduleArray;
    let getCurrentSchedule = (id) => {
        return schedule.find(
            (res) => res.schedule_id.toString() === id.toString()
        );
    }
    let currentID = parseInt(params.scheduleID, 10);
    let currentSchedule = getCurrentSchedule(currentID);
    console.log(schedule);
    console.log(currentSchedule);

    return (
        <div className="ScheduleDetail">
            <div className="BackButtonArea">
                <a className="BackButton"><Link to='/schedule'>{'<'} Go back to previous page</Link></a>
            </div>

            <div className="DetailInfo">
                <div className="ImageBox">
                    <div className='Icon'>
                        <div className="ScheduleImage">
                            <img height={'250'} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${currentSchedule.googlemaps_info.candidates[0].photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} />
                        </div>
                    </div>
                </div>
                <div className="InformationArea">
                    <div>
                        <a className="InformationAreaTitle">{currentSchedule.what_to_do}</a>
                    </div>
                    <div className="DetailInformationArea">
                      <a>
                        {currentSchedule.description}
                      </a>
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
                                <th>Link:</th>
                                <td><a href={`https://www.google.com/maps/place/?q=place_id:${currentSchedule.googlemaps_info.candidates[0].place_id}`}>
                                  Google Maps
                                </a></td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{ currentSchedule.googlemaps_info.candidates[0].formatted_address }</td>
                            </tr>
                            <tr>
                                <th>Opening Time:</th>
                                <td>{ currentSchedule.startTime } ~ { currentSchedule.endTime }</td>
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
