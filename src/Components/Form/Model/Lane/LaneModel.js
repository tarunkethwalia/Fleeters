import React, {Component} from 'react';
import "./LaneModel.css";
import {Modal} from 'react-bootstrap';
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
            // <div id="modal1" className="modal">
            //     <form onSubmit={this.handleLane}>
            //         <div className="modal-content">
            //             <input type="text" id='startPoint' onChange={this.handleLaneChange}/>
            //             <input type="text" id='endPoint' onChange={this.handleLaneChange} />
            //             <input type="number" id='distance' onChange={this.handleLaneChange} />
            //         </div>
            //         <div className="modal-footer">
            //             <button className="modal-close waves-effect waves-green btn-flat">Submit</button>
            //         </div>
            //     </form>
            // </div>
            <Modal
                {...this.props}
                show={this.props.show}
                size="lg"
                // onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                className="modelLane"
            >

                        <div id="modal1" className="modelHeadWrapper">
                            <form onSubmit={this.handleLane}>
                            <h4 className='modelHead'>Lane</h4>
                                <div className="modal-info">
                                    <input placeholder="Starting Point" type="text" id='startPoint' onChange={this.handleLaneChange}/>
                                    <input placeholder="Ending Point" type="text" id='endPoint' onChange={this.handleLaneChange} />
                                    <input placeholder="Distance(In Km)" type="number" id='distance' onChange={this.handleLaneChange} />
                                </div>
                            <div className="headButtons">
                                <button className="modal-close waves-effect waves-light btn">SUBMIT</button>
                            </div>
                            </form>
                        </div>


            </Modal>
        );
    }
}

export default LaneModel;