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
                size="xl"
                // onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                className="modelAlbum"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="modelHeadWrapper">
                            <span><h1 className='modelHead'>Lane Model</h1></span>
                            <div className="headButtons">
                                <i className="fas fa-times" onClick={this.props.onHide}></i>
                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modelBody">
                    <h1>Lane Body</h1>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LaneModel;