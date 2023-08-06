import React from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import ScheduleList from './components/ScheduleList';
import ScheduleDetail from './components/ScheduleDetail';
import ScheduleInfo from './components/ScheduleInfo'
import WithNavigateSearchPage from './components/SearchPage';
import WithNavigateScheduleList from './components/ScheduleList';
import axios from 'axios';

class InsideApp extends React.Component {
  constructor() {
    super();

    this.state ={
      searchInfo: {
        searchedScheduleType: 'placeholder type',
        searchedScheduleDate: 'placeholder date',
        searchedSchedulePlace: 'placeholder place',
      },

      placesList: [
        {
          schedule_id: 0,
          what_to_do: 'test_place',
          startTime: '12:00',
          endTime: '15:00',
          description: 'This is a test of the description.\nIt might contain new lines?\n',
          schedule_name: 'test_name',

          googlemap_id: 1234,
          schedule_image: 41414,
        }
      ],
    } 

    this.ChangeScheduleListOnSearch = this.ChangeScheduleListOnSearch.bind(this);
  }

  // request list of restaurants by restaurant name
  ChangeScheduleListOnSearch(place, date, type) {
    if (place == '') {
      console.log("invalid place");
      return;
    }

    const prompt = {place: place, date: date, type: type};
    console.log('Sending prompt', place, date, type);
    console.log('prompt:', prompt);
    let newSearchInfo = {
      searchedScheduleType: type,
      searchedScheduleDate: date,
      searchedSchedulePlace: place,
    };

    let listOfPlaces;

    axios
      .post("http://localhost:5000/ask", {
        prompt: prompt,
      })
      .then((res) => {
        console.log(res);

        let newPlacesList = res.data.newPlacesList;

        console.log(res.data.message.content);
        console.log(newPlacesList);
        this.setState({searchInfo: newSearchInfo, placesList: newPlacesList});
      })
      .then((err) => {
        console.log(err);
      })
      .then(() => this.props.navigate('/schedule'));
    }


    render() {
    return (
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<WithNavigateSearchPage ChangeScheduleListOnSearch={this.ChangeScheduleListOnSearch} />} />
          <Route path='/schedule' element={<ScheduleList ChangeScheduleListOnSearch={this.ChangeScheduleListOnSearch} scheduleArray={this.state.placesList} searchInfo={this.state.searchInfo}/>} >
            <Route path='*'></Route>
          </Route>
          <Route path='/detail' element={<ScheduleDetail />} >
            <Route path=':scheduleID' element={<ScheduleInfo scheduleArray={this.state.placesList} />} />
          </Route>
          <Route 
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>Schedule information not found!</p>
              </main>
            }
          />
        </Routes>
        <div className='Footer'>
            <a className='FooterText'>© Pedro Komessu</a>
        </div>
      </div>
    );
  }
}

function App(props) {
    let navigate = useNavigate();
    return <InsideApp {...props} navigate={navigate} />
}

export default App;
