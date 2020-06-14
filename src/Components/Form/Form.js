import React, {Component} from 'react';
import './Form.css';
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import CssUtilities from "../../Utils/Autocomplete";

class Form extends Component {
    render() {
        return (
            <div className="Form">
                <Navbar/>
                <div className="formFlex">
                    <div className="sidebarContent">
                        <SideBar/>
                    </div>
                    <div className="formWrapper">
                        <div className="formHeading"><h4>Create Demand:</h4></div>
                        <div className="demandConsigner">
                            <div className="consignerHeading">
                                <h5>Consigner</h5>
                            </div>
                            <div className="consignerInfo">
                                <div className="input-field">
                                    <input type="text" id="autocomplete-input" className="autocomplete"/>
                                    <label for="autocomplete-input">Select Lane</label>
                                    <div className="buttonFlex">
                                        <button className="waves-effect waves-light btn laneButton">Add</button>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <input type="text" id="autocomplete-input2" className="autocomplete2"/>
                                    <label for="autocomplete-input2">Select Consigner</label>
                                    <div className="buttonFlex">
                                        <button className="waves-effect waves-light btn">Edit</button>
                                        <button className="waves-effect waves-light btn">Add</button>
                                    </div>
                                </div>
                                <div className="input-field"></div>
                            </div>
                            <div className="consignerAutofill">
                                <p className="input-field">Starting Point</p>
                                <p className="input-field">Ending Point</p>
                                <p className="input-field">Distance (In Km.}</p>
                            </div>
                        </div>
                        <div className="demandTimings">
                            <div className="timingHeading">
                                <h5>Timings</h5>
                            </div>
                            <div className="timingsBody">
                                <div className="input-field">
                                    <input id="indent-time" type="text" className="validate"/>
                                    <label htmlFor="indent-time">Indent Time</label>
                                </div>
                                <div className="input-field">
                                    <input id="indent-close-time" type="text" className="validate"/>
                                    <label htmlFor="indent-close-time">Indent Closing Time</label>
                                </div>
                                <div className="input-field">
                                    <input id="loading-time" type="text" className="validate"/>
                                    <label htmlFor="loading-time">Loading Time</label>
                                </div>
                            </div>
                            <div className="timingsBody2">
                                <div className="input-field">
                                    <input id="TAT" type="text" className="validate"/>
                                    <label htmlFor="TAT">TAT</label>
                                </div>
                            </div>
                        </div>
                        <div className="demandAddress">
                            <div className="addressHeading">
                                <h5>Address</h5>
                            </div>
                            <div className="addressBody">
                                <div className="loadAddressBody">
                                    <div className="input-field">
                                        <input id="load-address" type="text" className="validate"/>
                                        <label htmlFor="load-address">Loading Address</label>
                                    </div>
                                    <div className="addressFlex">
                                        <div className="addressPOCHeading">
                                            <h6>POC</h6>
                                        </div>
                                        <button className="waves-effect waves-light btn">Add</button>
                                    </div>
                                </div>
                                <div className="unloadAddressBody">
                                    <div className="input-field">
                                        <input id="unload-address" type="text" className="validate"/>
                                        <label htmlFor="unload-address">Unloading Address</label>
                                    </div>
                                    <div className="addressFlex">
                                        <div className="addressPOCHeading">
                                            <h6>POC</h6>
                                        </div>
                                        <button className="waves-effect waves-light btn">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form