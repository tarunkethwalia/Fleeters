import axios from 'axios';
import env from "../environment";

class demandService {

    static getDemands = () => {
        return axios.get(`${env.API}activeDemands`);
    }

}

export default demandService;