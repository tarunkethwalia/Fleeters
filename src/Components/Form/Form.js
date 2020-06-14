import React, {Component} from 'react';
import './Form.css';
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import CssUtilities from "../../Utils/Autocomplete";

class Form extends Component {
    handleChange1 = (e) => {
        /*An array containing all the country names in the world:*/
        var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        CssUtilities.Autocomplete(e.target,countries);
    }
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
                                    <input type="text" id="autocomplete-input" className="autocomplete" />
                                    <label for="autocomplete-input">Select Lane</label>
                                    <button class="waves-effect waves-light btn laneButton">Add</button>
                                </div>
                                <div className="input-field">
                                    <input type="text" id="autocomplete-input2" className="autocomplete2" autoComplete="off" onChange={this.handleChange1} />
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