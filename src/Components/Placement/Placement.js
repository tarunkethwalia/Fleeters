import React, {Component} from 'react';
import './Placement.css'
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";

class Placement extends Component {
    render() {
        return (
            <div className="placements">
                <Navbar/>
                <div className="content">
                    <div className="sidebarContent">
                    <SideBar />
                    </div>
                    <div className="placementContent">
                        <p>Placements</p>
                    <div className="cardWrapper">
                        <div className="cardBox">
                            <div className="consigner">
                                <p>Yogesh Singh</p>
                                <span>Enterprise</span>
                            </div>
                            <div className="lane">
                                <p>Gurugram-Banglore</p>
                                <span>1200 Km</span>
                            </div>
                            <div className="vehicle">
                                <p>Vehicle</p>
                                <span>Open/32ft/15tn/MXL</span>
                            </div>
                            <div className="freight">
                                <p>Freight</p>
                                <span>Rs 65000</span>
                            </div>
                            <div className="timer">
                                <p>Icon</p>
                                <span>20 min</span>
                            </div>
                            <div className="closeButton">
                                <button className="waves-effect waves-light"><i className="fas fa-times"></i></button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Placement;