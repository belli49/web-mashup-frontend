import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import TripList from "./components/TripList.js";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      placesList: [],
    };

    this.askListOfPlaces = this.askListOfPlaces.bind(this);
  }

  // request list of restaurants by restaurant name
    askListOfPlaces(place, transportation) {
      console.log('Sending prompt', place);

      let message = `Make a plan for a 1 day date in ${place}. Display the plan in a list, in the following format:

(entry number);(place);(start time);(end time);(Description of what to do there)`;
    let listOfPlaces;

    axios
      .post("http://localhost:5000/ask", {
        prompt: message,
      })
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <button onClick={() => this.askListOfPlaces("Sendai")}>
              test
            </button>
          </div>
          <TripList/>
        </header>
      </div>
    );
  }
}

export default App;
