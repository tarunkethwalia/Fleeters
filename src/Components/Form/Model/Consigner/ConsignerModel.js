import React, {Component} from 'react';
import "./ConsignerModel.css";
import {Modal} from 'react-bootstrap';
import consignerService from "../../../../Services/consignerService";

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
            // <div id="modal2" className="modal">
            //     <form onSubmit={this.addConsigner}>
            //         <div className="modal-content">
            //             <input type="text" id='type' onChange={this.handleConsigner}/>
            //             <input type="text" id='name' onChange={this.handleConsigner}/>
            //             <input type="number" id='phoneNo' onChange={this.handleConsigner}/>
            //             <span className="waves-effect waves-green btn-flat" onClick={this.handlePhone}>Add Phone</span>
            //             <input type="text" id='address' onChange={this.handleConsigner}/>
            //             <span className="waves-effect waves-green btn-flat" onClick={this.handleAddress}>Add Address</span>
            //         </div>
            //         <div className="modal-footer">
            //             <button className="modal-close waves-effect waves-green btn-flat">Submit</button>
            //         </div>
            //     </form>
            // </div>
            <Modal
                {...this.props}
                show={this.props.show}
                size="xl"
                // onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                className="modelAlbum"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="modelHeadWrapper">
                            <span><h1 className='modelHead'>Consigner</h1></span>
                            <div className="headButtons">
                                <i className="fas fa-times" onClick={this.props.onHide}></i>
                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modelBody">
                    <h1>Model Body</h1>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ConsignerModel;