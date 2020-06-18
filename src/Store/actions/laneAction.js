import store from "../stores/store";
import laneService from "../../Services/laneService";

class LaneAction {

    static fetchLanes = () => {
        return laneService.getLanes()
            .then(data => {
                store.dispatch({type: 'LANE_DATA', lanes: data.data.data});
            }, error => {
                console.error(error)
            });
    }

}

export default LaneAction;