import React, {Component} from 'react';
import "./POCUnloadModel.css";
import $ from 'jquery';
import {Modal} from "react-bootstrap";

class POCUnloadModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            POCNameUA: '',
            POCPhoneUA: '',
            POCPhoneArrUA: []
        }
    }

    addingPOCData = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handlePOCArray = () => {
        let PPArr = [];
        PPArr.push(...this.state.POCPhoneArrUA, this.state.POCPhoneUA);
        this.setState({
            ...this.state,
            POCPhoneArrUA: PPArr
        });
        document.getElementById('POCPhoneUA').value = '';
    }

    handleSubmit = () => {
        this.props.pocfunction({Name: this.state.POCNameUA, PhoneNo: this.state.POCPhoneArrUA}, 2);
        this.setState({
            ...this.state,
            POCPhoneArrUA: []
        });
        document.getElementById('POCNameUA').value = '';
        $('.modal-overlay').click();
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
                <div id="modalPOCUnload" className="POCWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <h4 className='unloadModelHead'>Unloading POC</h4>
                        <div className="unload-modal-info">
                    <div className="input-field some">
                        <input type="text" id="POCNameUA" className="POCNameUA"
                               onChange={this.addingPOCData}/>
                        <label htmlFor="POCNameUA">POC Name:</label>
                    </div>
                    <div className="input-field some">
                        <input type="number" id="POCPhoneUA" className="POCPhoneUA"
                               onChange={this.addingPOCData}/>
                        <label htmlFor="POCPhoneUA">Phone No:</label>
                        <div className="buttonFlex unloadPOC">
                            <span className="btn" onClick={this.handlePOCArray}>Add Phone</span>
                        </div>
                    </div>
                            <div className="showPhone">
                                {
                                    this.state.POCPhoneArrUA.map(Phone => {
                                        return (
                                            <p>{Phone}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    <div className="POCSubmitBtn">
                        <button className='btn'>Add POC</button>
                    </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default POCUnloadModel;