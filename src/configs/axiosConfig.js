import axios from 'axios';
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        let token = '';
        if (localStorage.getItem('userInfo')) {
            token = JSON.parse(localStorage.getItem('userInfo')).token;
        }
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        if (error.response.status == 401) {
            localStorage.removeItem('userInfo');
            console.log('Error 401');
            window.location.href = '/login'
        }
        if (error.response.status == 500) {
            console.log(error);
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;