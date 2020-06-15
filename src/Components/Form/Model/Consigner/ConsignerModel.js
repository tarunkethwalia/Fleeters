import React, {Component} from 'react';
import "./ConsignerModel.css";
import consignerService from "../../../../Services/consignerService";

class ConsignerModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            name: '',
            phoneNo: [],
            address: [],

        }
    }

    handleConsigner = (e) => {
        e.preventDefault();
        consignerService.addConsigner({Type: this.state.type, Name: this.state.name, PhoneNo: this.state.phoneNo, Address: this.state.address}).then(data=>{
            console.log(data.data.message);
        }).catch(error=>{
            console.error(error);
        })
    }

    handleConsignerChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        });
    }
    render() {
        return (
            <div id="modal2" className="modal">
                <form onSubmit={this.handleConsigner}>
                    <div className="modal-content">
                        <input type="text" id='type' onChange={this.handleConsignerChange}/>
                        <input type="text" id='name'  onChange={this.handleConsignerChange} />
                        <input type="number" id='phoneNo' onChange={this.handleConsignerChange} />
                        <input type="text" id='address' onChange={this.handleConsignerChange}/>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ConsignerModel;