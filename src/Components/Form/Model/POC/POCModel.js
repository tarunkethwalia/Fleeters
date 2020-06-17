import React, {Component} from 'react';
import "./POCModel.css";
import {Modal} from 'react-bootstrap';

class POCModel extends Component {
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
        this.props.pocfunction({Name: this.state.POCName, PhoneNo: this.state.POCPhoneArr});
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
                size="xl"
                // onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                className="modelAlbum"
            >
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
                            <button className="btn" onClick={this.handlePOCArray}>Add Phone</button>
                        </div>
                    </div>
                    <div className="POCSubmitBtn">
                        <button onClick={this.handleSubmit}>Add POC</button>
                    </div>
                </div>
                <div className="showPhone">
                    {
                        this.state.POCPhoneArr.map(Phone=>{
                            return (
                                <p>{Phone}</p>
                            )
                        })
                    }
                </div>
            </Modal>
        );
    }
}

export default POCModel;