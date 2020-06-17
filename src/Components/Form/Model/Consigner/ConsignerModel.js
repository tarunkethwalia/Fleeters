import React, {Component} from 'react';
import "./ConsignerModel.css";
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
            <div id="consignerModal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
            </div>
        );
    }
}

export default ConsignerModel;