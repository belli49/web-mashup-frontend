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

    this.getListOfPlaces = this.getListOfPlaces.bind(this);
  }


  // request list of restaurants by restaurant name
  getListOfPlaces(place, transportation, startingTime, endingTime) {
    console.log('Sending prompt', place);

    let prompt = `Make a plan for a 1 day date in ${place}. Display the plan in a list, with each entry in the same line (with no newline characters or carriage returns), in the following format:

"(entry number)#(place name)#(start time)#(end time)#(Description of what to do there);"

example: "1#Zuihoden Mausoleum#9:00am#10:00am#Visit the final resting place of Date Masamune, one of Japan's most powerful feudal lords, and admire the intricate architecture and beautiful surroundings.;"`;

  let listOfPlaces;

  axios
    .post("http://localhost:5000/ask", {
      prompt: prompt,
    })
    .then((res) => {
      console.log(res);

      let newPlacesList = res.data.message.content
        .replace(/(\r\n|\n|\r)/gm, "")
        .split(';')
        .map((placeEntry) => {
          let info = placeEntry.split('#');

          return {
            entryNumber: info[0],
            name: info[1],
            startTime: info[2],
            endTime: info[3],
            description: info[4],
          };
        });

      console.log(newPlacesList);
      this.setState({placesList: newPlacesList});
    })
    .then((err) => {
      console.log(err);
    });
  }



// TEST PURPOSES
  test(inp) {
    let newPlacesList = inp
      .replace(/(\r\n|\n|\r)/gm, "")
      .split(';')
      .map((placeEntry) => {
        let info = placeEntry.split('#');

        return {
          entryNumber: info[0],
          name: info[1],
          startTime: info[2],
          endTime: info[3],
          description: info[4],
        };
     });

    console.log(newPlacesList);
  }
// TEST PURPOSES

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="InputArea">
            <div className="InputEntry">
              <div width={'10px'}>
                <a>Location </a>
              </div>
              <input width={'25px'}/>
            </div>

            <div className="InputEntry">
              <div width={'10px'}>
                <a>Days </a>
              </div>
              <input width={'25px'}/>
            </div>

            <div className="InputEntry">
              <div width={'10px'}>
                <a>Budget </a>
              </div>
              <input width={'25px'}/>
            </div>

            <div>
              <button onClick={() => this.getListOfPlaces(`Sendai`)}>
                test
              </button>
            </div>
          </div>

          <TripList placesList={this.state.placesList}/>
        </header>
      </div>
    );
  }
}

export default App;
