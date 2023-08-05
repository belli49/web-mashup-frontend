import React from "react";
import { useNavigate } from "react-router-dom";
import './SearchPage.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduleName: ''
        }

        this.HandleInputChange = this.HandleInputChange.bind(this);
        this.HandleSearchButtonClick = this.HandleSearchButtonClick.bind(this);
        this.getListOfPlaces = this.getListOfPlaces.bind(this);
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
        this.props.navigate(`/schedule/${this.state.scheduleName}`);
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
    
    render () {
        return (
            <div className="SearchPage">
                <div className="SearchPageWrapper">
                    <div className="SearchTitle">
                        <h1 className="TitleText">Start by searching for a schedule!</h1>
                    </div>
                    <div className="SearchArea">
                        <div className="InputWrapper">
                            <div className="InputFields">
                                <div className="InputsTop">
                                    <input className="PlaceInput" placeholder="Place"></input>
                                    <input className="TypeInput" placeholder="Type"></input>
                                </div>
                                <div className="InputBot">
                                    <input 
                                        className="Input" 
                                        placeholder="Place"
                                        value={this.state.scheduleName}
                                        onChange={evt => this.HandleInputChange(evt)}
                                    />
                                </div>
                            </div>
                            <div className="Buttons">
                                <div>
                                    <button className="Button">Search Nearby</button>
                                </div>
                                <div>
                                    <button className="Button" onClick={this.HandleSearchButtonClick}>Search</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

function WithNavigateSearchPage(props) {
    let navigate = useNavigate();
    return <SearchPage {...props} navigate={navigate} />
}

export default WithNavigateSearchPage;