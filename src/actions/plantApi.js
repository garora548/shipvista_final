import axios from 'axios';

const baseUrl = "http://localhost:49423/api"

export default{
    plantApiMethods(url = baseUrl + "/plant/"){
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id ),
            create : newPlant => axios.post(url, newPlant),
            update : (id, updatePlant) => axios.put(url +id, updatePlant),
            delete : id => axios.delete(url + id)
        }
    }

}