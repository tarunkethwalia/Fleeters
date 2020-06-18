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
import demandService from "../../Services/demandService";
import Swal from "sweetalert2";

class Form extends Component {
    constructor(props) {
        super(props);
        this.selectRoutes = [];
        this.selectConsignor = [];
        this.addressObj = {
            Address: '',
            POC: []
        };
        this.addressObj2 = {
            Address: '',
            POC: []
        };

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
        this.vehicle = {
            vehicleType: '',
            Tyres: null,
            Height: null,
            TruckType: '',
            HQ: false
        }
        this.item = {
            Commodity: '',
            Tonnage: null
        }
        this.freight = {
            Amount: null,
            Advance: null,
            Percentage: null
        }
        this.state = {
            suggestions: [],    //selectLane
            value: '',          //selectLane
            text: '',           //selectLane
            lanes: [],          //Lanes
            consignors: [],     // Consignors
            consignorsSuggestions: [],  //selectConsignor
            consignorValue: '',  //selectConsignor
            consignorText: '',   //selectConsignor
            CN: '',              //Consignor Name
            CT: '',              //Consignor Type
            CP: [],              //Consignor PhoneNo
            CA: [],              //Consignor Address
            showLaneModel: false,   //Lane Model
            showPOCLoadModel: false, //POC Load Model
            showPOCUnloadModel: false, //POC Unload Model
            startingPoint: '',    //disabled Lane
            endingPoint: '',    //disabled Lane
            distance: '',       //disabled Lane
            route: '',          //disabled Lane
            loadAddress: '',    //Loading Address
            POCLoadArr: [],     //Loading Address POC
            LoadingAddress: [],     //Loading Address Array
            unloadAddress: '',    //UnLoading Address
            POCUnloadArr: [],     //UnLoading Address POC
            UnLoadingAddress: [],     //UnLoading Address Array
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
            store.dispatch({type: 'LANE_DATA', lanes: data.data.data});
            const lanes = store.getState().lane.lanes;
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
            const consignors = data.data.data;
            const consignorsArr = [];
            consignors.map(consignor => {
                let consignorName = consignor.Name;
                let consignorNumber = consignor.PhoneNo[0];
                let consignorDetails = consignorName + ' - ' + consignorNumber;
                consignorsArr.push(consignorDetails);
            });
            this.selectConsignor = consignorsArr;
            this.setState({
                ...this.state,
                consignors: consignors
            });
        }, error => {
            console.error(error);
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
    updateLanes = (lanes) => {
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
    }
    hidePOCLoadModel = () => {
        this.setState({
            ...this.state,
            showPOCLoadModel: false
        });
    };
    hidePOCUnloadModel = () => {
        this.setState({
            ...this.state,
            showPOCUnloadModel: false
        });
    };

    //Address Functions
    handlePOCDetails = (POCObj, id) => {
        if (id === 1) {
            this.setState({
                ...this.state,
                POCLoadArr: [...this.state.POCLoadArr, POCObj]
            });
        } else {
            this.setState({
                ...this.state,
                POCUnloadArr: [...this.state.POCUnloadArr, POCObj]
            });
        }
    }
    addStoppage = () => {
        this.addressObj = {
            Address: this.state.loadAddress,
            POC: this.state.POCLoadArr
        };
        this.address = {
            ...this.address,
            LoadingAddress: [...this.address.LoadingAddress, this.addressObj]
        };
        this.setState({
            ...this.state,
            LoadingAddress: [...this.state.LoadingAddress, this.addressObj],
            POCLoadArr: []
        });
        document.getElementById('loadAddress').value = '';
    }
    addStoppage2 = () => {
        this.addressObj2 = {
            Address: this.state.unloadAddress,
            POC: this.state.POCUnloadArr
        };
        this.address = {
            ...this.address,
            UnLoadingAddress: [...this.address.UnLoadingAddress, this.addressObj2]
        };
        this.setState({
            ...this.state,
            UnLoadingAddress: [...this.state.UnLoadingAddress, this.addressObj2],
            POCUnloadArr: []
        });
        document.getElementById('unloadAddress').value = '';
    }

    //Input Functions
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }
    handleVehicleChange = (e) => {
        this.vehicle = {
            ...this.vehicle,
            [e.target.id]: e.target.value
        }
    }
    handleItemChange = (e) => {
        this.item = {
            ...this.item,
            [e.target.id]: e.target.value
        }
    }
    handleTimeChange = (e) => {
        this.time = {
            ...this.time,
            TAT: e.target.value
        }
    }
    handleFreightChange = (e) => {
        this.freight = {
            ...this.freight,
            [e.target.id]: e.target.value
        }
    }

    // Selection Functions
    onHandleConsignorChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.selectConsignor.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
                ...this.state,
                consignorsSuggestions: suggestions,
                consignorText: value
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

    suggestionConsignorSelected = (value) => {
        let cons = value.split(' ');
        let consName = cons[0];
        let consPhone = cons[cons.length - 1];
        let CN, CT, CP, CA = null;
        this.state.consignors.map(consignor => {
            let splitName = consignor.Name.split(' ');
            let Phone = consignor.PhoneNo.toString().indexOf(consPhone);
            if (splitName[0] === consName && Phone !== -1) {
                CN = consignor.Name;
                CT = consignor.Type;
                CP = consignor.PhoneNo;
                CA = consignor.Address;
            }
        });
        this.setState({
            ...this.state,
            consignorText: value,
            consignorsSuggestions: [],
            CN,
            CT,
            CP,
            CA
        });
    }
    suggestionSelected(value) {
        let Sp = null;
        let Ep = null;
        let Ds = null;
        let Rs = null;
        this.state.lanes.map(lane => {
            if (lane.Route === value) {
                Sp = lane.StartPoint;
                Ep = lane.EndPoint;
                Ds = lane.Distance;
                Rs = lane.Route;
                return true;
            }
        });
        this.setState(() => ({
            ...this.state,
            text: value,
            suggestions: [],
            startingPoint: Sp,
            endingPoint: Ep,
            distance: Ds,
            route: Rs
        }));
    }

    renderConsignorSuggestions() {
        const {consignorsSuggestions} = this.state;
        if (consignorsSuggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {consignorsSuggestions.map((item) => <li
                    onClick={() => this.suggestionConsignorSelected(item)}>{item}</li>)}
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

    //Submit Demand Function
    submitDemand = (e) => {
        e.preventDefault();
        demandService.createDemands({
            Consigner: {
                Name: this.state.CN,
                Type: this.state.CT,
                Address: this.state.CA,
                PhoneNo: this.state.CP
            },
            Lane: {
                StartPoint: this.state.startingPoint,
                EndPoint: this.state.endingPoint,
                Distance: this.state.distance,
                Route: this.state.route
            },
            Address: this.address,
            Item: this.item,
            Time: this.time,
            Vehicle: this.vehicle,
            Freight: this.freight
        }).then(data => {
            console.log(data.data.data);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Create Demand'
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        icon: 'success',
                        title: data.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }).catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        })
    }

    render() {
        const {text,consignorText} = this.state;
        return (
            <div className="Form">
                {/*Navbar*/}
                <Navbar/>

                {/*Lane Model*/}
                <LaneModel show={this.state.showLaneModel} onHide={() => this.hideLaneModel()}
                           updateLanes={this.updateLanes}/>

                {/*Consignor Model*/}
                <ConsignerModel/>

                {/*POC Load Model*/}
                <POCLoadModel pocfunction={this.handlePOCDetails} show={this.state.showPOCLoadModel}
                              onHide={() => this.hidePOCLoadModel()}/>

                {/*POC Unload Model*/}
                <POCUnloadModel pocfunction={this.handlePOCDetails} show={this.state.showPOCUnloadModel}
                                onHide={() => this.hidePOCUnloadModel()}/>

                {/*Wrapper*/}
                <div className="formFlex">

                    {/*Sidebar Wrapper*/}
                    <div className="sidebarContent">
                        <SideBar/>
                    </div>

                    {/*Form Wrapper*/}
                    <div className="formWrapper">
                        <form onSubmit={this.submitDemand}>

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
                                            <input value={consignorText} type="text" id="autocomplete-input2" className="autocomplete2"
                                                   onChange={this.onHandleConsignorChange} autoComplete="off"/>
                                            <label htmlFor="autocomplete-input2">Select Consignor</label>
                                            {this.renderConsignorSuggestions()}
                                            <div className="buttonFlex">
                                                <span className="waves-effect waves-light btn">Edit</span>
                                                <span className="waves-effect waves-light btn modal-trigger"
                                                      href="#consignerModal">Add</span>
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
                                            <input id="TAT" type="number" className="validate" min='0'
                                                   onChange={this.handleTimeChange}/>
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
                                                       onChange={this.handleChange}/>
                                                <label htmlFor="loadAddress">Loading Address</label>
                                            </div>
                                            <div className="addressFlex">
                                                <div className="addressPOCHeading">
                                                    <h6>POC</h6>
                                                </div>
                                                <span className="btn" onClick={() => {
                                                    this.setState({...this.state, showPOCLoadModel: true})
                                                }}> Add POC
                                                </span>
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
                                                <span className="waves-effect waves-light btn"
                                                      onClick={this.addStoppage}>Add Stoppage</span>
                                            </div>
                                            <div className="POCFooter">
                                                <div className="footerHeading">
                                                    <h6>Loading</h6>
                                                </div>
                                                <div className="footerBody">
                                                    {
                                                        this.address.LoadingAddress.map(LA => {
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
                                                <input id="unloadAddress" type="text" className="validate"
                                                       onChange={this.handleChange}/>
                                                <label htmlFor="unloadAddress">Unloading Address</label>
                                            </div>
                                            <div className="addressFlex">
                                                <div className="addressPOCHeading">
                                                    <h6>POC</h6>
                                                </div>
                                                <span className="btn" onClick={() => {
                                                    this.setState({...this.state, showPOCUnloadModel: true})
                                                }}> Add POC
                                                </span>
                                            </div>
                                            <div className="POCDetails">
                                                {
                                                    this.state.POCUnloadArr.map(poc => {
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
                                                <span className="waves-effect waves-light btn"
                                                      onClick={this.addStoppage2}>Add Stoppage</span>
                                            </div>
                                            <div className="POCFooter">
                                                <div className="footerHeading">
                                                    <h6>Unloading</h6>
                                                </div>
                                                <div className="footerBody">
                                                    {
                                                        this.address.UnLoadingAddress.map(LA => {
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
                                    </div>
                                </div>

                                {/*Vehicle Details*/}
                                <div className="demandVehicle">
                                    <div className="vehicleHeading">
                                        <h5>Vehicle</h5>
                                    </div>
                                    <div className="vehicleInfo">
                                        <div className="input-field">
                                            <input type="text" id="vehicleType" className="autocomplete"
                                                   onChange={this.handleVehicleChange}/>
                                            <label htmlFor="vehicleType">Vehicle Type</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="number" id="Height" className="autocomplete2"
                                                   onChange={this.handleVehicleChange} min='0'/>
                                            <label htmlFor="Height">Feets</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="number" id="Tyres" className="autocomplete2"
                                                   onChange={this.handleVehicleChange} min='0'/>
                                            <label htmlFor="Tyres">Tyres</label>
                                        </div>
                                    </div>
                                    <div className="vehicleInfo">
                                        <div className="input-field">
                                            <input type="text" id="TruckType" className="autocomplete"
                                                   onChange={this.handleVehicleChange}/>
                                            <label htmlFor="TruckType">Vehicle Size</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" id="Commodity" className="autocomplete2"
                                                   onChange={this.handleItemChange}/>
                                            <label htmlFor="Commodity">Item Type</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="number" id="Tonnage" className="autocomplete2"
                                                   onChange={this.handleItemChange} min='0'/>
                                            <label htmlFor="Tonnage">Tonnage</label>
                                        </div>
                                    </div>
                                    <div className="vehicleInfo">
                                        <div className="input-field">
                                            <input type="number" id="Amount" className="autocomplete" min='0'
                                                   onChange={this.handleFreightChange}/>
                                            <label htmlFor="Amount">Freight</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="number" id="Advance" className="autocomplete2" min='0'
                                                   onChange={this.handleFreightChange}/>
                                            <label htmlFor="Advance">Advance</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="number" id="Percentage" className="autocomplete2" min='0'
                                                   onChange={this.handleFreightChange}/>
                                            <label htmlFor="Percentage">Percentage</label>
                                        </div>
                                    </div>
                                    <div className="vehicleInfo">
                                        <div className="HQWrapper">
                                            <span>HQ</span>
                                            <div className="switch">
                                                <label>
                                                    No
                                                    <input type="checkbox" onClick={() => {
                                                        this.vehicle = {...this.vehicle, HQ: !this.vehicle.HQ}
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
                                            <input id="count" type="number" className="validate" min='1'/>
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