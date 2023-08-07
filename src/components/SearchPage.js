import React from "react";
import { useNavigate } from "react-router-dom";
import './SearchPage.css';
import axios from 'axios';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduleName: '',
            scheduleDate: '',
            scheduleType: ''
        }

        this.HandleInputChange = this.HandleInputChange.bind(this);
        this.HandleSearchButtonClick = this.HandleSearchButtonClick.bind(this);
        this.ClearSelections = this.ClearSelections.bind(this);
    }

    HandleInputChange(evt, type) {
        const val = evt.target.value;

      switch (type) {
        case 'place':
          this.setState({ scheduleName: val });
          break;

        case 'date':
          this.setState({ scheduleDate: val });
          break;

        case 'type':
          this.setState({ scheduleType: val });
          break;

        default:
          console.log('input change type undefined');
          break;
      }
    }

    HandleSearchButtonClick() {
        console.log(`button clicked: ${this.state.scheduleName}`);
        this.props.ChangeScheduleListOnSearch(this.state.scheduleName, this.state.scheduleDate, this.state.scheduleType)
    }

    
    ClearSelections() {
      this.setState({scheduleDate: '', scheduleName: '', scheduleType: ''});
    }

    
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
                                  <input className="DateInput" placeholder="Date"
                                    value={this.state.scheduleDate}
                                    onChange={evt => this.HandleInputChange(evt, 'date')}
                                  />
                                  <input className="TypeInput" placeholder="Type"
                                    value={this.state.scheduleType}
                                    onChange={evt => this.HandleInputChange(evt, 'type')}
                                  />
                                </div>
                                <div className="InputBot">
                                    <input 
                                        className="Input" 
                                        placeholder="Place"
                                        value={this.state.scheduleName}
                                        onChange={evt => this.HandleInputChange(evt, 'place')}
                                    />
                                </div>
                            </div>
                            <div className="Buttons">
                                <div>
                                    <button className="Button" onClick={this.ClearSelections}>Clear</button>
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
