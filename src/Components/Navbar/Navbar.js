import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <h4>Fleeters</h4>
                <Link className="waves-effect waves-light" to="/">Logout</Link>
            </div>
        )
    }
}

export default Navbar;