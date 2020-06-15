import React, {Component} from 'react';
import './Form.css';
import {Link} from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Datepicker from "../Datepicker/Datepicker";
import store from "../../Store/stores/store";
import LaneModel from "./Model/Lane/LaneModel";
import laneService from "../../Services/laneService";
import ConsignerModel from "./Model/Consigner/ConsignerModel";
import consignerService from "../../Services/consignerService";
const moment =require('moment');

class Form extends Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            suggestions: [],    //selectLane
            value: '',  //selectLane
            text: '',   //selectLane
            startingPoint: '',    //disabled Lane
            endingPoint: '',    //disabled Lane
            distance: '',    //disabled Lane
            lanes : [],  //Lanes
            time: null,
            HQ: false
        }
    }

    componentDidMount() {
        const time = store.getState().time;
        this.setState({
            ...this.state,
            time: time
        });
        laneService.getLanes().then(data=>{
            const lanes = data.data.data;
            const routes = [];
            lanes.map(lane=>{
                let route = lane.Route;
                routes.push(route);
            });
            this.items = routes;
            this.setState({
                ...this.state,
                lanes: lanes
            });
        }).catch(error=>{
            console.error(error);
        });
    }

    handleDateChange = (value,id) => {
        if(id === 'indentTime'){
            store.dispatch({type:'INDENT_TIME', indentTime: value});
            // const timing = store.getState().time.indentTime;
            // console.log("ist :"+timing);
            // console.log( "utd : "+moment.utc(timing).format());
        }
        else if(id === 'closingTime'){
            store.dispatch({type:'CLOSING_TIME', closingTime: value});
        }
        else {
            store.dispatch({type:'LOADING_TIME', loadingTime: value});
        }
    }

    hideModel = () => {
        this.setState({
            ...this.state,
            showModel : false
        });
    };

    onHandleChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
                suggestions, text: value
            }
        ));
    }

    suggestionSelected(value) {
        this.setState(() => ({
            ...this.state,
            text: value,
            suggestions: [],
        }));
        this.state.lanes.map(lane=>{
            if (lane.Route === value){
                this.setState({
                    ...this.state,
                    startingPoint: lane.StartPoint,
                    endingPoint: lane.EndPoint,
                    distance: lane.Distance
                });
            }
        });
    }

    renderSuggestions() {
        const {suggestions} = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    render() {
        const {text} = this.state;
        return (
            <div className="Form">
                <Navbar/>
                <LaneModel />
                <ConsignerModel/>
                <div className="formFlex">
                    <div className="sidebarContent">
                        <SideBar/>
                    </div>
                    <div className="formWrapper">
                        <div className="formHeading"><h4>Create Demand:</h4></div>
                        <div className="formCard">
                            <div className="demandConsigner">
                                <div className="consignerHeading">
                                    <h5>Consigner</h5>
                                </div>
                                <div className="consignerInfo">
                                    <div className="input-field some">
                                        <input value={text} type="text" id="autocomplete-input" className="autocomplete"
                                               onChange={this.onHandleChange}/>
                                        <label htmlFor="autocomplete-input">Select Lane</label>
                                        {this.renderSuggestions()}
                                        <div className="buttonFlex">
                                            {/*<button className="waves-effect waves-light btn laneButton" onClick={() => {this.setState({...this.state, showModel : true})}}>Add</button>*/}
                                            <button data-target="modal1" className="btn modal-trigger"> add </button>
                                        </div>
                                    </div>
                                    <div className="input-field some2">
                                        <input type="text" id="autocomplete-input2" className="autocomplete2"/>
                                        <label htmlFor="autocomplete-input2">Select Consigner</label>
                                        <div className="buttonFlex">
                                            <button className="waves-effect waves-light btn">Edit</button>
                                            {/*<button className="waves-effect waves-light btn">Add</button>*/}
                                            <button data-target="modal2" className="btn modal-trigger"> add </button>
                                        </div>
                                    </div>
                                    {/*<div className="input-field"></div>*/}
                                </div>
                                <div className="consignerAutofill">
                                    <div className="input-field">
                                        <input placeholder="Starting Point" disabled value={this.state.startingPoint}
                                               id="disabled1" type="text"
                                               className="validate"/>
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Ending Point" disabled value={this.state.endingPoint}
                                               id="disabled2" type="text"
                                               className="validate"/>
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Distance(in Km.)" disabled value={this.state.distance}
                                               id="disabled3" type="text"
                                               className="validate"/>
                                    </div>
                                </div>
                            </div>
                            <div className="demandTimings">
                                <div className="timingHeading">
                                    <h5>Timings</h5>
                                </div>
                                <div className="timingsBody">
                                    <div className="input-field">
                                        <Datepicker dateValue={this.handleDateChange} label='Indent Time' id='indentTime'/>
                                    </div>
                                    <div className="input-field">
                                        <Datepicker dateValue={this.handleDateChange} label='Closing Time' id='closingTime'/>
                                    </div>
                                    <div className="input-field">
                                        <Datepicker dateValue={this.handleDateChange} label='Loading Time' id='loadingTime'/>
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
                                            <button className="waves-effect waves-light btn">Add POC</button>
                                        </div>
                                        <div className="POCDetails">
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                        </div>
                                        <div className='POCSubmit'>
                                            <button className="waves-effect waves-light btn">Add Stoppage</button>
                                        </div>
                                        <div className="POCFooter">
                                            <div className="footerHeading">
                                                <h6>Loading</h6>
                                            </div>
                                            <div className="footerBody">
                                                <div className="footerDiv">
                                                    <span className='loadAddress'>Some Dummy address with some dummy data</span>
                                                    <Link to='/'>View</Link>
                                                </div>
                                            </div>
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
                                            <button className="waves-effect waves-light btn">Add POC</button>
                                        </div>
                                        <div className="POCDetails">
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                            <div className="POCDiv">
                                                <span className='POCName'>Amit Singh</span>
                                                <span>9871917358</span>
                                            </div>
                                        </div>
                                        <div className='POCSubmit'>
                                            <button className="waves-effect waves-light btn">Add Stoppage</button>
                                        </div>
                                        <div className="POCFooter">
                                            <div className="footerHeading">
                                                <h6>Unloading</h6>
                                            </div>
                                            <div className="footerBody">
                                                <div className="footerDiv">
                                                    <span className='loadAddress'>Some Dummy address with some dummy data</span>
                                                    <Link to='/'>View</Link>
                                                </div>
                                                <div className="footerDiv">
                                                    <span className='loadAddress'>Some Dummy address with some dummy data</span>
                                                    <Link to='/'>View</Link>
                                                </div>
                                                <div className="footerDiv">
                                                    <span className='loadAddress'>Some Dummy address with some dummy data</span>
                                                    <Link to='/'>View</Link>
                                                </div>
                                                <div className="footerDiv">
                                                    <span className='loadAddress'>Some Dummy address with some dummy data</span>
                                                    <Link to='/'>View</Link>
                                                </div>
                                                <div className="footerDiv">
                                                    <span className='loadAddress'>Some Dummy address with some dummy data</span>
                                                    <Link to='/'>View</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="demandVehicle">
                                <div className="vehicleHeading">
                                    <h5>Vehicle</h5>
                                </div>
                                <div className="vehicleInfo">
                                    <div className="input-field">
                                        <input type="text" id="vehicle-type" className="autocomplete"/>
                                        <label htmlFor="vehicle-type">Vehicle Type</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="feets" className="autocomplete2"/>
                                        <label htmlFor="feets">Feets</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="tyres" className="autocomplete2"/>
                                        <label htmlFor="tyres">Tyres</label>
                                    </div>
                                </div>
                                <div className="vehicleInfo">
                                    <div className="input-field">
                                        <input type="text" id="vehicle-size" className="autocomplete"/>
                                        <label htmlFor="vehicle-size">Vehicle Size</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="item-type" className="autocomplete2"/>
                                        <label htmlFor="item-type">Item Type</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="tonnage" className="autocomplete2"/>
                                        <label htmlFor="tonnage">Tonnage</label>
                                    </div>
                                </div>
                                <div className="vehicleInfo">
                                    <div className="input-field">
                                        <input type="text" id="freight" className="autocomplete"/>
                                        <label htmlFor="freight">Freight</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="advance" className="autocomplete2"/>
                                        <label htmlFor="advance">Advance</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="percentage" className="autocomplete2"/>
                                        <label htmlFor="percentage">Percentage</label>
                                    </div>
                                </div>
                                <div className="vehicleInfo">
                                    <div className="HQWrapper">
                                        <span>HQ</span>
                                        <div className="switch">
                                            <label>
                                                No
                                                <input type="checkbox" onClick={()=>{this.setState({...this.state, HQ: !this.state.HQ})}}/>
                                                <span className="lever"></span>
                                                Yes
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="demandCount">
                                <div className="countHeading">
                                    <h5>No. of Counts</h5>
                                </div>
                                <div className="countBody">
                                    <div className="input-field">
                                        <input id="count" type="number" className="validate"/>
                                        <label htmlFor="count">Count</label>
                                    </div>
                                </div>
                            </div>
                            <div className="demandSubmit">
                                <button className="waves-effect waves-light btn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form