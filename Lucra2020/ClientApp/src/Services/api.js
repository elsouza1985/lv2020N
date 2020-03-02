import axios from "axios";
import { getToken, getEstabelecimento } from "./auth";

const api = axios.create({
    baseURL: "https://localhost:44323/api/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }    
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
});

export default api;