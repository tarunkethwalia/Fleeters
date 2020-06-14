import React, {Component} from 'react';
import './Placement.css'
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import demandService from "../../Services/demandService";

class Placement extends Component {
    componentDidMount() {
        demandService.getDemands().then(data=>{
            if(data.data.data.length === 0){
                this.setState({
                    ...this.state,
                    demands: null
                });
            } else {
                this.setState({
                    ...this.state,
                    demands: data.data.data
                });
            }
        }).catch(error=>{
            console.error(error);
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            demands: null
        }
    }

    render() {
        let demands = this.state.demands;
        return (
            <div className="placements">
                <Navbar/>
                <div className="content">
                    <div className="sidebarContent">
                    <SideBar />
                    </div>
                    {
                        demands === null ?
                            (
                                <div className="placementContent emptyDemands">
                                    <h1>There are no Demands yet.</h1>
                                </div>
                            )
                            :
                            (
                                <div className="placementContent">
                                    <div className="cardWrapper">
                                        {
                                            demands && demands.map(demand=>{
                                                return(
                                                    <div className="cardBox" key={demand._id}>
                                                        <div className="consigner">
                                                            <h4>{demand.Consigner.Name}</h4>
                                                            <span>{demand.Consigner.Type}</span>
                                                        </div>
                                                        <div className="lane">
                                                            <h4>{demand.Lane.StartPoint+' - '+demand.Lane.EndPoint}</h4>
                                                            <span>{demand.Lane.Distance+' Km'}</span>
                                                        </div>
                                                        <div className="vehicle">
                                                            <h4>Vehicle</h4>
                                                            <span>{demand.Vehicle.vehicleType} {demand.Vehicle.Height+'ft'} {demand.Item.Tonnage+'tn'} {demand.Vehicle.TruckType === "Not Applicable" ? null : demand.Vehicle.TruckType }</span>
                                                        </div>
                                                        <div className="freight">
                                                            <h4>Freight</h4>
                                                            <span>{demand.Freight.Amount}</span>
                                                        </div>
                                                        <div className="timer">
                                                            <i className="far fa-clock"></i>
                                                            <p>20 mins</p>
                                                        </div>
                                                        <div className="closeButton">
                                                            <button className="waves-effect waves-light"><i className="fas fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Placement;