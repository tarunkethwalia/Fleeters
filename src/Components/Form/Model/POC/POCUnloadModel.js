import React, {Component} from 'react';
import "./POCUnloadModel.css";
import $ from 'jquery';

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
            <div id="modalPOCUnload" className="modal modal-fixed-footer">
                <div className="POCWrapper">
                    <div className="input-field some">
                        <input type="text" id="POCNameUA" className="POCNameUA"
                               onChange={this.addingPOCData}/>
                        <label htmlFor="POCNameUA">POC Name:</label>
                    </div>
                    <div className="input-field some">
                        <input type="number" id="POCPhoneUA" className="POCPhoneUA"
                               onChange={this.addingPOCData}/>
                        <label htmlFor="POCPhoneUA">Phone No:</label>
                        <div className="buttonFlex">
                            <span className="btn" onClick={this.handlePOCArray}>Add Phone</span>
                        </div>
                    </div>
                    <div className="POCSubmitBtn">
                        <button className='btn' onClick={this.handleSubmit}>Add POC</button>
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
        );
    }
}

export default POCUnloadModel;