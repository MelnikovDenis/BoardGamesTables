import axios from "axios";

export const API_URL = "http://localhost:6200/";
const api = axios.create({
      baseURL: API_URL
});

export default api;