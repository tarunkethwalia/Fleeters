import React, { Component } from 'react'
import './SideBar.css'

class SideBar extends Component {
    render() {
        return (
            <div className="SideBar">
                <div className="SideBar-Content">
                    <a className="active" href="/">Placement</a>
                    <a href="/">Demand</a>
                    <a href="/">Operation</a>
                    <a href="/">Transit</a>
                </div>
            </div>
        )
    }
}

export default SideBar