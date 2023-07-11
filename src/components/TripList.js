import React from "react";
import TripItem from "./TripItem";
import "./TripList.css";

class TripList extends React.Component {
  constructor() {
    super();

    this.state = {
      placeList: [{ name: 'McD' },
                  { name: 'BK' }],
    };

  }


  render() {
    return (
      <div className="TripList">
        {this.state.placeList.map((place) => {
          return (<TripItem placeInfo={place}/>);
        })}
      </div>
    );
  }
}

export default TripList;
