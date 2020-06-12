import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Form from './Components/Form/Form'
import Placement from './Components/Placement/Placement'
import Login from './Components/Login/Login'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/placement' component={Placement}/>
                        <Route path='/demand' component={Form}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;