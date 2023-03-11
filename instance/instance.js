import axios from 'axios';

const axiosinstance = axios.create({ 
    baseUrl: process.env.BASE_API_URL,
})

export default axiosinstance;