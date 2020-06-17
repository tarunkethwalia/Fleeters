import React, {Component} from 'react';
import "./POCUnloadModel.css";
import $ from 'jquery';

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
        document.getElementById('POCName').value = '';
        $('.modal-overlay').click();
    }

    render() {
        return (
            <div id="modalPOCLoad" className="modal modal-fixed-footer">
                <div className="POCWrapper">
                    <div className="input-field some">
                        <input type="text" id="POCName" className="POCName"
                               onChange={this.addingPOCData}/>
                        <label htmlFor="POCName">POC Name:</label>
                    </div>
                    <div className="input-field some">
                        <input type="number" id="POCPhone" className="POCPhone" id='POCPhone'
                               onChange={this.addingPOCData}/>
                        <label htmlFor="POCPhone">Phone No:</label>
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
                        this.state.POCPhoneArr.map(Phone => {
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

export default POCLoadModel;