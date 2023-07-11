import React from "react";
import TripItem from "./TripItem";
import "./TripList.css";

class TripList extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }


  render() {
    return (
      <div className="PlanList">
        {this.props.placesList.map((place) => {
          return (<TripItem key={place.name} placeInfo={place}/>);
        })}
      </div>
    );
  }
}

export default TripList;
