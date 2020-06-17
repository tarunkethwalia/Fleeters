import axios from 'axios';
import env from '../environment'

class consignerService {
    static addConsigner = (data) => {
        return axios.post(`${env.API}addConsigner`, data);
    }

    static getConsigners = () => {
        return axios.get(`${env.API}getConsigners`);
    }
}

export default consignerService;