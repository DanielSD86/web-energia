import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const api = axios.create({  
    baseURL: process.env.REACT_APP_API_URL,
});

console.log(process.env);

export default api;