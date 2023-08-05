import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ScheduleList.css";

class ScheduleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colorPerPercent: ['green', 'lightgreen', 'yellow', 'orange', 'red'],
            scheduleName: '',
        }

        this.HandleInputChange = this.HandleInputChange.bind(this);
        this.HandleSearchButtonClick = this.HandleSearchButtonClick.bind(this);
    }

    HandleInputChange(evt) {
        const val = evt.target.value;
        this.setState({
            scheduleName: val
        });
    }

    HandleSearchButtonClick() {
        console.log(`button clicked: ${this.state.scheduleName}`);
        this.props.ChangeScheduleListOnSearch(this.state.scheduleName);
        this.props.navigate(`/schedule/${this.state.scheduleName}`)
    }
    
    render () {
        return (
            <div className="ScheduleList">
                <div className="SearchAreaList">
                    <input className="InputList"
                        value={this.state.scheduleName}
                        onChange={evt => this.HandleInputChange(evt)}
                    ></input>
                    <button className="ButtonList"
                        onClick={this.HandleSearchButtonClick}
                    ><img height={"16px"} src="https://www.seekpng.com/png/full/920-9209972_magnifying-glass-png-white-search-icon-white-png.png"></img></button>
                </div>
                <div className="ScheduleArea">
                    <ul className="InfoList">
                        {
                            this.props.scheduleArray.map((d, idx) => {
                                return (
                                    <li key={d.schedule_id} className="ListItem">
                                        <Link
                                            style={{textDecoration: 'none', fontWeight: 'bold'}}
                                            to={`/detail/${d.schedule_id}`}
                                        >
                                            <div className="ListItemBox">
                                                <div className="ItemImageDiv">
                                                    <img className="ItemImage" 
                                                    src={(d.googlemap_id.toString().length < 10) ? d.schedule_image : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${d.schedule_image}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}></img>
                                                </div>

                                                <div className="ItemInfoArea">
                                                    <div className="ItemTitle">
                                                        <a className="TitleText" style={{fontSize: "x-large"}}>
                                                            {d.schedule_name.substring(0, 20)}
                                                        </a>
                                                        <a style={{fontSize: 'small'}}>
                                                            Japanese Food
                                                        </a>
                                                    </div>

                                                    <div className="ListedItemInfo">
                                                        <div className="ScheduleInfo">
                                                            <a>{ ((d.congestion == 1) ? "Wait Time: 10min" : "Available") }</a>
                                                        </div>

                                                        <div className="CongestionLevelBox">
                                                            <div style={{marginBottom: '6px'}}>
                                                                <a>Congestion</a>
                                                            </div>

                                                            <div className="donut"
                                                                style={{background: 
                                                                `conic-gradient(
                                                                    ${this.state.colorPerPercent[Math.ceil(d.congestion * 5) - 1]} 0deg 
                                                                    ${d.congestion * 360}deg, lightgrey 
                                                                    ${d.congestion * 360}deg 360deg)`}}
                                                            >
                                                                <div className="hole">
                                                                    <a className="holeNumber">{Math.floor(d.congestion * 100)}</a>
                                                                </div>
                                                            </div>
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
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

function WithNavigateScheduleList(props) {
    let navigate = useNavigate();
    return <ScheduleList {...props} navigate={navigate} />
}

export default WithNavigateScheduleList;
