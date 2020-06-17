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
import moment from 'moment';
import consignerService from "../../Services/consignerService";
import POCLoadModel from "./Model/POC/POCLoadModel";
import POCUnloadModel from "./Model/POC/POCUnloadModel";

class Form extends Component {
    constructor(props) {
        super(props);
        this.selectRoutes = [];
        this.selectConsigner = [];
        this.addressObj = {
            Address: '',
            POC: []
        }

        this.consigner = {};
        this.time = {
            IndentTime: '',
            ClosingTime: '',
            LoadingTime: '',
            TAT: ''
        }
        this.address = {
            LoadingAddress: [],
            UnLoadingAddress: []
        }
        this.state = {
            suggestions: [],    //selectLane
            consignersSuggestions: [],  //selectConsigner
            value: '',  //selectLane
            consignerValue: '',  //selectConsigner
            text: '',   //selectLane
            consignerText: '',   //selectConsigner
            showLaneModel: false,   //Lane Model
            startingPoint: '',    //disabled Lane
            endingPoint: '',    //disabled Lane
            distance: '',    //disabled Lane
            lanes: [],  //Lanes
            consigners: [],     // Consigners
            loadAddress: '',    //Loading Address
            POCLoadArr: [],     //Loading Address POC
            LoadingAddress: [],     //Loading Address Array
            HQ: false
        }
    }

    componentDidMount() {
        const time = store.getState().time;
        this.time = {
            ...this.time,
            IndentTime: time.indentTime,
            ClosingTime: time.closingTime,
            LoadingTime: time.loadingTime
        }

        laneService.getLanes().then(data => {
            const lanes = data.data.data;
            const routes = [];
            lanes.map(lane => {
                let route = lane.Route;
                routes.push(route);
            });
            this.selectRoutes = routes;
            this.setState({
                ...this.state,
                lanes: lanes
            });
        }, error => {
            console.error(error);
        });
        consignerService.getConsigners().then(data => {
            const consigners = data.data.data;
            const consignersArr = [];
            consigners.map(consigner => {
                let consignerName = consigner.Name;
                let consignerNumber = consigner.PhoneNo[0];
                let consignerDetails = consignerName + ' - ' + consignerNumber;
                consignersArr.push(consignerDetails);
            });
            this.selectConsigner = consignersArr;
            this.setState({
                ...this.state,
                consigners: consigners
            });
        });
    }

    // Date Function
    handleDateChange = (value, id) => {
        if (id === 'indentTime') {
            let times = moment.utc(value).format();
            store.dispatch({type: 'INDENT_TIME', indentTime: times});
            let indent = store.getState().time.indentTime;
            this.time = {
                ...this.time,
                IndentTime: indent
            }
        } else if (id === 'closingTime') {
            let times = moment.utc(value).format();
            store.dispatch({type: 'CLOSING_TIME', closingTime: times});
            let closing = store.getState().time.closingTime;
            this.time = {
                ...this.time,
                ClosingTime: closing
            }
        } else {
            let times = moment.utc(value).format();
            store.dispatch({type: 'LOADING_TIME', loadingTime: times});
            let loading = store.getState().time.loadingTime;
            this.time = {
                ...this.time,
                LoadingTime: loading
            }
        }
    }

    // Model Functions
    hideLaneModel = () => {
        this.setState({
            ...this.state,
            showLaneModel: false
        });
    };

    //Address Functions
    handlePOCDetails = (POCObj, id) => {
        if (id === 1) {
            this.setState({
                ...this.state,
                POCLoadArr: [...this.state.POCLoadArr, POCObj]
            });
        }
    }
    addStoppage = () => {
        this.addressObj = {
            Address: this.state.loadAddress,
            POC: this.state.POCLoadArr
        };
        this.address = {
            LoadingAddress: [...this.address.LoadingAddress, this.addressObj]
        };
        this.setState({
            ...this.state,
            LoadingAddress: [...this.state.LoadingAddress, this.addressObj],
            POCLoadArr: []
        });
        document.getElementById('loadAddress').value = '';
    }

    //Input Functions
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    // Selection Functions
    onHandleConsignerChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.selectConsigner.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
                ...this.state,
                consignersSuggestions: suggestions,
                consignerText: value
            }
        ));
    }
    onHandleLaneChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.selectRoutes.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
                ...this.state,
                suggestions,
                text: value
            }
        ));
    }

    suggestionConsignerSelected = (value) => {
        let cons = value.split(' ');
        let consName = cons[0];
        let consPhone = cons[cons.length - 1];
        this.state.consigners.map(consigner => {
            let splitName = consigner.Name.split(' ');
            let Phone = consigner.PhoneNo.indexOf(consPhone);
            if (splitName === consName && Phone !== -1) {
                this.consigner = consigner;
            }
        });
    }
    suggestionSelected(value) {
        let Sp = null;
        let Ep = null;
        let Ds = null;
        this.state.lanes.map(lane => {
            if (lane.Route === value) {
                Sp = lane.StartPoint;
                Ep = lane.EndPoint;
                Ds = lane.Distance;
                return true;
            }
        });
        this.setState(() => ({
            ...this.state,
            text: value,
            suggestions: [],
            startingPoint: Sp,
            endingPoint: Ep,
            distance: Ds
        }));
    }

    renderConsignerSuggestions() {
        const {consignersSuggestions} = this.state;
        if (consignersSuggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {consignersSuggestions.map((item) => <li
                    onClick={() => this.suggestionConsignerSelected(item)}>{item}</li>)}
            </ul>
        );
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
                {/*Navbar*/}
                <Navbar/>

                {/*Lane Model*/}
                <LaneModel show={this.state.showLaneModel} onHide={() => this.hideLaneModel()}/>

                {/*Consigner Model*/}
                <ConsignerModel/>

                {/*POC Load Model*/}
                <POCLoadModel pocfunction={this.handlePOCDetails}/>

                {/*POC Unload Model*/}
                <POCUnloadModel/>

                {/*Wrapper*/}
                <div className="formFlex">

                    {/*Sidebar Wrapper*/}
                    <div className="sidebarContent">
                        <SideBar/>
                    </div>

                    {/*Form Wrapper*/}
                    <div className="formWrapper">
                        <form>

                            {/*Form Heading*/}
                            <div className="formHeading"><h4>Create Demand:</h4></div>

                            <div className="formCard">

                                {/*Consigner & Lane Details*/}
                                <div className="demandConsigner">
                                    <div className="consignerHeading">
                                        <h5>Consigner</h5>
                                    </div>
                                    <div className="consignerInfo">
                                        <div className="input-field some">
                                            <input value={text} type="text" id="autocomplete-input"
                                                   className="autocomplete"
                                                   onChange={this.onHandleLaneChange} autoComplete="off"/>
                                            <label htmlFor="autocomplete-input">Select Lane</label>
                                            {this.renderSuggestions()}
                                            <div className="buttonFlex">
                                                <span className="btn" onClick={() => {
                                                    this.setState({...this.state, showLaneModel: true})
                                                }}> Add
                                                </span>
                                            </div>
                                        </div>
                                        <div className="input-field some2">
                                            <input type="text" id="autocomplete-input2" className="autocomplete2"
                                                   onChange={this.onHandleConsignerChange} autoComplete="off"/>
                                            <label htmlFor="autocomplete-input2">Select Consigner</label>
                                            {this.renderConsignerSuggestions()}
                                            <div className="buttonFlex">
                                                <span className="waves-effect waves-light btn">Edit</span>
                                                <a className="waves-effect waves-light btn modal-trigger"
                                                   href="#consignerModal">Add</a>
                                            </div>
                                        </div>
                                        {/*<div className="input-field"></div>*/}
                                    </div>
                                    <div className="consignerAutofill">
                                        <div className="input-field">
                                            <input placeholder="Starting Point" disabled
                                                   value={this.state.startingPoint}
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

                                {/*Timing Details*/}
                                <div className="demandTimings">
                                    <div className="timingHeading">
                                        <h5>Timings</h5>
                                    </div>
                                    <div className="timingsBody">
                                        <div className="input-field">
                                            <Datepicker dateValue={this.handleDateChange} label='Indent Time'
                                                        id='indentTime'/>
                                        </div>
                                        <div className="input-field">
                                            <Datepicker dateValue={this.handleDateChange} label='Closing Time'
                                                        id='closingTime'/>
                                        </div>
                                        <div className="input-field">
                                            <Datepicker dateValue={this.handleDateChange} label='Loading Time'
                                                        id='loadingTime'/>
                                        </div>
                                    </div>
                                    <div className="timingsBody2">
                                        <div className="input-field">
                                            <input id="TAT" type="number" className="validate" min='0'/>
                                            <label htmlFor="TAT">TAT</label>
                                        </div>
                                    </div>
                                </div>

                                {/*Address Details*/}
                                <div className="demandAddress">

                                    {/*Address Heading*/}
                                    <div className="addressHeading">
                                        <h5>Address</h5>
                                    </div>

                                    <div className="addressBody">
                                        <div className="loadAddressBody">
                                            <div className="input-field">
                                                <input id="loadAddress" type="text" className="validate"
                                                       onChange={this.handleChange} />
                                                <label htmlFor="loadAddress">Loading Address</label>
                                            </div>
                                            <div className="addressFlex">
                                                <div className="addressPOCHeading">
                                                    <h6>POC</h6>
                                                </div>
                                                <a className="waves-effect waves-light btn modal-trigger"
                                                   href="#modalPOCLoad">Add POC</a>
                                            </div>
                                            <div className="POCDetails">
                                                {
                                                    this.state.POCLoadArr.map(poc => {
                                                        return (
                                                            <div className="POCDiv">
                                                                <span className='POCName'>{poc.Name}</span>
                                                                <span>{poc.PhoneNo[0]}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='POCSubmit'>
                                                <span className="waves-effect waves-light btn" onClick={this.addStoppage}>Add Stoppage</span>
                                            </div>
                                            <div className="POCFooter">
                                                <div className="footerHeading">
                                                    <h6>Loading</h6>
                                                </div>
                                                <div className="footerBody">
                                                    {
                                                        this.address.LoadingAddress.map(LA=>{
                                                            return (
                                                                <div className="footerDiv">
                                                                    <span className='loadAddress'>{LA.Address}</span>
                                                                    <Link to='/'>View</Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
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
                                                <a className="waves-effect waves-light btn modal-trigger"
                                                   href="#modalPOCUnload">Add POC</a>
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
                                                <span className="waves-effect waves-light btn">Add Stoppage</span>
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
                                                    <input type="checkbox" onClick={() => {
                                                        this.setState({...this.state, HQ: !this.state.HQ})
                                                    }}/>
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
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form