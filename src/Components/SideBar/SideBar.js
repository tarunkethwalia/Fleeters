import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './SideBar.css'

class SideBar extends Component {
    render() {
        return (
            <div className="SideBar">
                <div className="SideBar-Content">
                    <NavLink exact to="/placement" className="waves-effect waves-light">Placement</NavLink>
                    <NavLink to="/demand" className="waves-effect waves-light">Demand</NavLink>
                    <NavLink to="/operation" className="waves-effect waves-light">Operation</NavLink>
                    <NavLink to="/transit" className="waves-effect waves-light">Transit</NavLink>
                </div>
            </div>
        )
    }
}

export default SideBar