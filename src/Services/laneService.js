import axios from 'axios';
import env from '../environment'

class laneService {
    static addLane = (data) => {
        return axios.post(`${env.API}addLane`, data);
    }

    static getLanes = () => {
        return axios.get(`${env.API}getLanes`);
    }
}

export default laneService;