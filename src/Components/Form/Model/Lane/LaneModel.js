import React, {Component} from 'react';
import "./LaneModel.css";
import laneService from "../../../../Services/laneService";

class LaneModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
           startPoint: '',
           endPoint: '',
           distance: null
        }
    }

    handleLane = (e) => {
        e.preventDefault();
        laneService.addLane({StartPoint: this.state.startPoint, EndPoint: this.state.endPoint, Distance: this.state.distance, Route: `${this.state.startPoint} - ${this.state.endPoint}`}).then(data=>{
            console.log(data.data.message);
        }).catch(error=>{
            console.error(error);
        })
    }

    handleLaneChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        });
    }
    render() {
        return (
            <div id="modal1" className="modal">
                <form onSubmit={this.handleLane}>
                    <div className="modal-content">
                        <input type="text" id='startPoint' onChange={this.handleLaneChange}/>
                        <input type="text" id='endPoint' onChange={this.handleLaneChange} />
                        <input type="number" id='distance' onChange={this.handleLaneChange} />
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LaneModel;