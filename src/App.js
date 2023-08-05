import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import ScheduleList from './components/ScheduleList';
import ScheduleDetail from './components/ScheduleDetail';
import ScheduleInfo from './components/ScheduleInfo'
import WithNavigateSearchPage from './components/SearchPage';
import WithNavigateScheduleList from './components/ScheduleList';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();

    this.state ={
      restaurants: [],
    } 

    this.ChangeScheduleListOnSearch = this.ChangeScheduleListOnSearch.bind(this);
  }

  // request list of restaurants by restaurant name
  ChangeScheduleListOnSearch(restaurantName) {
    let newScheduleList;

    axios.post('http://127.0.0.1:5000/result_list_by_name', {
      restaurant_name: `${restaurantName}`
    })
      .then(res => {
        console.log(res.data);
        newScheduleList = res.data;
        newScheduleList.forEach(el => {
          if (el.congestion == -1) {
            if (Math.random() > 0.85) el.congestion = 1;
            else el.congestion = Math.floor(Math.random() * el.capacity)/el.capacity;
          }
          el.capacity = 20 + Math.floor(60 *Math.random());
        })

        this.setState({
          restaurants: newScheduleList,
        })
      })
      .then(err => {
        console.log(err)
      })
  }
s
  render() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<WithNavigateSearchPage ChangeScheduleListOnSearch={this.ChangeScheduleListOnSearch} />} />
        <Route path='/restaurants' element={<WithNavigateScheduleList ChangeScheduleListOnSearch={this.ChangeScheduleListOnSearch} restaurantArray={this.state.restaurants} />} >
          <Route path='*'></Route>
        </Route>
        <Route path='/detail' element={<ScheduleDetail />} >
          <Route path=':restaurantID' element={<ScheduleInfo restaurantArray={this.state.restaurants} />} />
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

export default App;
