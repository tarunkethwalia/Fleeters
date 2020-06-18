import React, {Component} from 'react';
import "./ConsignerModel.css";
import consignerService from "../../../../Services/consignerService";
import {Modal} from "react-bootstrap";

class ConsignerModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            name: '',
            phoneNo: null,
            phoneArr: [],
            address: null,
            addressArr: []
        }
    }

    addConsigner = (e) => {
        e.preventDefault();
        consignerService.addConsigner({
            Type: this.state.type,
            Name: this.state.name,
            PhoneNo: this.state.phoneArr,
            Address: this.state.addressArr
        }).then(data => {
            console.log(data.data.message);
        }).catch(error => {
            console.error(error);
        })
    }

    handleConsigner = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    handlePhone = () => {
        this.setState({
            ...this.state,
            phoneArr: [...this.state.phoneArr, this.state.phoneNo]
        });
        document.getElementById('phoneNo').value = '';
    }

    handleAddress = () => {
        this.setState({
            ...this.state,
            addressArr: [...this.state.addressArr, this.state.address]
        });
        document.getElementById('address').value = '';
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
                <div id="modalConsigner" className="consignerWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <h4 className='consignerModelHead'>Consigner</h4>
                        <div className="consigner-modal-info">
                            <div className="input-field some">
                                <input type="text" id="name" className="name"
                                       onChange={this.handleConsigner}/>
                                <label htmlFor="name">Name:</label>
                            </div>
                            <div className="input-field some">
                                <input type="text" id="type" className="type"
                                       onChange={this.handleConsigner}/>
                                <label htmlFor="type">Type:</label>
                            </div>
                            <div className="input-field some">
                                <input type="number" id="phoneNo" className="phoneNo"
                                       onChange={this.handleConsigner}/>
                                <label htmlFor="phoneNo">Phone No:</label>
                                <div className="buttonFlex consignerPhone">
                                    <span className="btn" onClick={this.handlePhone}>Add Phone</span>
                                </div>
                            </div>
                            <div className="input-field some">
                                <input type="number" id="address" className="address"
                                       onChange={this.handleConsigner}/>
                                <label htmlFor="address">Address:</label>
                                <div className="buttonFlex consignerAddress">
                                    <span className="btn" onClick={this.handleAddress}>Add Address</span>
                                </div>
                            </div>
                        </div>
                        <div className="showPhone">
                            {
                                this.state.phoneArr.map(Phone => {
                                    return (
                                        <p>{Phone}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="showAddress">
                            {
                                this.state.addressArr.map(Phone => {
                                    return (
                                        <p>{Phone}</p>
                                    )
                                })
                            }
                        </div>
                <div className="consignerSubmitBtn">
                    <button className='btn'>Submit</button>
                </div>
            </form>
    </div>
    </Modal>
    );
    }
    }

    export default ConsignerModel;