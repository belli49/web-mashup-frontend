import React from "react";
import { Link } from "react-router-dom";
import "./ScheduleList.css";

class ScheduleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
            <div className="ScheduleList">
                <div className="ScheduleArea">
                    <div>
                        <h3>Showing results for a {this.props.searchInfo.searchedScheduleType ? this.props.searchInfo.searchedScheduleType : 'Trip'} in {this.props.searchInfo.searchedSchedulePlace}</h3>
                    </div>
                    <ul className="InfoList">
                        {
                            this.props.scheduleArray.map((d, idx) => {
                              try {
                                return (
                                    <li key={d.schedule_id} className="ListItem">
                                        <Link
                                            style={{textDecoration: 'none', fontWeight: 'bold'}}
                                            to={`/detail/${d.schedule_id}`}
                                        >
                                            <div className="ListItemBox">
                                                <div className="ItemImageDiv">
                                                    <img className="ItemImage" 
                                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${d.googlemaps_info.candidates[0].photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}></img>
                                                </div>

                                                <div className="ItemInfoArea">
                                                    <div className="ItemTitle">
                                                        <a className="TitleText" style={{fontSize: "x-large"}}>
                                                            {d.schedule_name.substring(0, 20)}
                                                        </a>
                                                        <a style={{fontSize: 'small'}}>
                                                            Time: ~{parseInt(d.endTime) - parseInt(d.startTime)} hours
                                                        </a>
                                                    </div>

                                                    <div className="ListedItemInfo">
                                                        <div className="ScheduleInfo">
                                                          <a>{d.startTime + '~' + d.endTime}</a>
                                                        </div>
                                                    </div>

                                                    <div className="DetailsButtonArea">
                                                        <button className="ButtonD">Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                  )
                                } catch (err) {
                                  console.log(err);
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default ScheduleList;
