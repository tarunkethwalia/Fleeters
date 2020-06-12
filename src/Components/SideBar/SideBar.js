import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './SideBar.css'

class SideBar extends Component {
    render() {
        return (
            <div className="SideBar">
                <div className="SideBar-Content">
                    <NavLink exact to="/">Placement</NavLink>
                    <NavLink to="/demand">Demand</NavLink>
                    <NavLink to="/operation">Operation</NavLink>
                    <NavLink to="/transit">Transit</NavLink>
                </div>
            </div>
        )
    }
}

export default SideBar