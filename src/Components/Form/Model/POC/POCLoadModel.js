import React, {Component} from 'react';
import "./POCLoadModel.css";
import $ from 'jquery';
import {Modal} from "react-bootstrap";

class POCLoadModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            POCName: '',
            POCPhone: '',
            POCPhoneArr: []
        }
    }

    addingPOCData = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handlePOCArray = () => {
        let PPArr = [];
        PPArr.push(...this.state.POCPhoneArr, this.state.POCPhone);
        this.setState({
            ...this.state,
            POCPhoneArr: PPArr
        });
        document.getElementById('POCPhone').value = '';
    }

    handleSubmit = () => {
        this.props.pocfunction({Name: this.state.POCName, PhoneNo: this.state.POCPhoneArr}, 1);
        this.setState({
            ...this.state,
            POCPhoneArr: []
        });
       this.props.onHide();
    }

    render() {
        return (
            <Modal
                {...this.props}
                show={this.props.show}
                size="lg"
                // onHide={() => setShow(false)}
                dialogClassName="modal-content"
                className="modelLane"
            >
                <div id="modalPOCLoad" className="POCWrapper">
                        <h4 className='loadModelHead'>Loading POC</h4>
                        <div className="load-modal-info">
                            <div className="input-field some">
                                <input type="text" id="POCName" className="POCName"
                                       onChange={this.addingPOCData}/>
                                <label htmlFor="POCName">POC Name:</label>
                            </div>
                            <div className="input-field some">
                                <input type="number" id="POCPhone" className="POCPhone"
                                       onChange={this.addingPOCData}/>
                                <label htmlFor="POCPhone">Phone No:</label>
                                <div className="buttonFlex loadPOC">
                                    <span className="btn" onClick={this.handlePOCArray}>Add Phone</span>
                                </div>
                            </div>
                            <div className="showPhoneNo">
                                {
                                    this.state.POCPhoneArr.map(Phone => {
                                        return (
                                            <p>{Phone}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="POCSubmitBtn">
                            <button className='btn' onClick={this.handleSubmit}>Add POC</button>
                        </div>
                </div>
            </Modal>
        );
    }
}

export default POCLoadModel;