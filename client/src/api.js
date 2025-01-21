// client/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.43.107/server', //backend server  api call 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
