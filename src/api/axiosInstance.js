import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;