import React, { Component } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'
import Form from './Components/Form/Form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="flexWrap">
          <SideBar />
          <Form />
        </div>
      </div>
    )
  }
}

export default App;