import React from "react";
import "./TripItem.css";

class TripItem extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }


  render() {
    return (
      <div className="TripItemEntry">
        <a>{this.props.placeInfo.name}</a>
        <a>{this.props.placeInfo.startTime} ~ {this.props.placeInfo.endTime}</a>
        <a>{this.props.placeInfo.description}</a>
      </div>
    );
  }
}

export default TripItem;
