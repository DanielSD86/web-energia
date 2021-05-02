import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const api = axios.create({  
    baseURL: 'http://localhost:3001/',
});

export default api;