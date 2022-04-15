
import API_KEY from '../constants/API_KEY';
import axios from 'axios';

export default async (coords) => {
    let rCity = 'Not Found';
    await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${coords.latitude},${coords.longitude}`)
        .then(res => {
            rCity = res.data.data[0].locality;
        }).catch(err => { console.log(err) });
    return rCity;
}