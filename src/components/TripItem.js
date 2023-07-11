import React from "react";
import "./TripList.css";

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
      </div>
    );
  }
}

export default TripItem;
