import React, {Component} from 'react';
import './Form.css';
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class Form extends Component {
    handleChange1 = () => {
        document.getElementsByTagName('input.autocomplete').autocomplete({
            data: {
                "Apple": null,
                "Microsoft": null,
                "Google": 'https://placehold.it/250x250'
            },
        });
    }
    render() {
        const useStyles = makeStyles((theme) => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 200,
            },
        }));
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
                                    <input type="text" id="autocomplete-input" className="autocomplete" />
                                    <label for="autocomplete-input">Select Lane</label>
                                    <button class="waves-effect waves-light btn laneButton">Add</button>
                                </div>
                                <div className="input-field">
                                    <input type="text" id="autocomplete-input2" className="autocomplete" onChange={this.handleChange1} />
                                    <label for="autocomplete-input2">Select Consigner</label>
                                    <button className="waves-effect waves-light btn">Edit</button>
                                    <button className="waves-effect waves-light btn">Add</button>
                                </div>
                                <div className="input-field"></div>
                            </div>
                            <div className="consignerAutofill">
                                <p>Starting Point</p>
                                <p>Ending Point</p>
                                <p>Distance(In Km.}</p>
                            </div>
                        </div>
                    </div>
                    {/*<div className="demandTimings">*/}
                    {/*    Timings*/}
                    {/*    <div>*/}
                    {/*        <TextField*/}
                    {/*            id="datetime-local"*/}
                    {/*            label="Indent Time"*/}
                    {/*            type="datetime-local"*/}
                    {/*            defaultValue="2017-05-24T10:30"*/}
                    {/*            className={useStyles.textField}*/}
                    {/*            InputLabelProps={{*/}
                    {/*                shrink: true,*/}
                    {/*            }}/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <TextField*/}
                    {/*            id="datetime-local"*/}
                    {/*            label="Closing Time"*/}
                    {/*            type="datetime-local"*/}
                    {/*            defaultValue="2017-05-24T10:30"*/}
                    {/*            className={useStyles.textField}*/}
                    {/*            InputLabelProps={{*/}
                    {/*                shrink: true,*/}
                    {/*            }}/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <TextField*/}
                    {/*            id="datetime-local"*/}
                    {/*            label="Loading Time"*/}
                    {/*            type="datetime-local"*/}
                    {/*            defaultValue="2017-05-24T10:30"*/}
                    {/*            className={useStyles.textField}*/}
                    {/*            InputLabelProps={{*/}
                    {/*                shrink: true,*/}
                    {/*            }}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="demandAddress">*/}
                    {/*    Addresses*/}
                    {/*    <div className="loadingAddress">*/}
                    {/*        <div className="input-field">*/}
                    {/*            <input id="loadingAddress" type="text" className="validate"/>*/}
                    {/*            <label htmlFor="loadingAddress">Loading Address</label>*/}
                    {/*        </div>*/}
                    {/*        POC*/}
                    {/*        <button className="waves-effect waves-light btn">Add</button>*/}
                    {/*    </div>*/}
                    {/*    <div className="unloadingAddress">*/}
                    {/*        <div className="input-field">*/}
                    {/*            <input id="unloadingAddress" type="text" className="validate"/>*/}
                    {/*            <label htmlFor="unloadingAddress">Unloading Address</label>*/}
                    {/*        </div>*/}
                    {/*        POC*/}
                    {/*        <button className="waves-effect waves-light btn">Add</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="demandVehicle">*/}
                    {/*    Vehicle*/}
                    {/*    <div className="input-field">*/}
                    {/*        <select>*/}
                    {/*            <option value="" disabled selected>Choose your option</option>*/}
                    {/*            <option value="1">Open</option>*/}
                    {/*            <option value="2">Container</option>*/}
                    {/*            <option value="3">Trailer</option>*/}
                    {/*        </select>*/}
                    {/*        <label>Vehicle Type</label>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-field">*/}
                    {/*        <select>*/}
                    {/*            <option value="" disabled selected>Choose your option</option>*/}
                    {/*            <option value="1">Option 1</option>*/}
                    {/*            <option value="2">Option 2</option>*/}
                    {/*            <option value="3">Option 3</option>*/}
                    {/*        </select>*/}
                    {/*        <label>Vehicle Type</label>*/}
                    {/*    </div>*/}
                    {/*    <div className="input-field">*/}
                    {/*        <select>*/}
                    {/*            <option value="" disabled selected>Choose your option</option>*/}
                    {/*            <option value="1">Option 1</option>*/}
                    {/*            <option value="2">Option 2</option>*/}
                    {/*            <option value="3">Option 3</option>*/}
                    {/*        </select>*/}
                    {/*        <label>Vehicle Type</label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default Form