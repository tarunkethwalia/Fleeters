import React, {Component} from 'react';
import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'
import Form from './Components/Form/Form'
import Placement from './Components/Placement/Placement'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <div className="flexWrap">
                        <SideBar/>
                        <Switch>
                            <Route exact path='/' component={Placement} />
                            <Route path='/demand' component={Form} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;