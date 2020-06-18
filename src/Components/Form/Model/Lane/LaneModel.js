import React, {Component} from 'react';
import "./LaneModel.css";
import {Modal} from 'react-bootstrap';
import laneService from "../../../../Services/laneService";
import Swal from "sweetalert2";
import store from "../../../../Store/stores/store";

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
            Swal.fire({
                icon: 'success',
                title: data.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            this.setState({
                startPoint: '',
                endPoint: '',
                distance: null
            });
            laneService.getLanes().then(data=>{
                store.dispatch({type: 'LANE_DATA', lanes: data.data.data});
                this.props.updateLanes(data.data.data);
            },error=>{
                console.error(error)
            });
            this.props.onHide();
        }).catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
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
            <Modal
                {...this.props}
                show={this.props.show}
                size="lg"
                // onHide={() => setShow(false)}
                dialogClassName="modal-content"
                className="modelLane"
            >

                        <div id="modalLane" className="modelHeadWrapper">
                            <form onSubmit={this.handleLane}>
                            <h4 className='modelHead'>Lane</h4>
                                <div className="modal-info">
                                    <div className="input-field points">
                                        <input type="text" id="startPoint" className="startPoint"
                                               onChange={this.handleLaneChange}/>
                                        <label htmlFor="startPoint">Starting Point:</label>
                                    </div>
                                    <div className="input-field points">
                                        <input type="text" id="endPoint" className="endPoint"
                                               onChange={this.handleLaneChange}/>
                                        <label htmlFor="endPoint">Ending Point:</label>
                                    </div>
                                    <div className="input-field points">
                                        <input type="text" id="distance" className="distance"
                                               onChange={this.handleLaneChange}/>
                                        <label htmlFor="distance">Distance:</label>
                                    </div>
                                </div>
                            <div className="headButtons">
                                <button className="modal-close waves-effect waves-light btn">Submit</button>
                            </div>
                            </form>
                        </div>


            </Modal>
        );
    }
}

export default LaneModel;