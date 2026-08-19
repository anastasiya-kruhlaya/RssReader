import axios from 'axios'
import store from 'Store/store'
import { logout } from 'Actions/authActions';


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5149/api',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;