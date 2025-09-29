import axios from 'axios'

export const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    withCredentials : true,
    withXSRFToken : true
})

axiosClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.location.href = '/'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);