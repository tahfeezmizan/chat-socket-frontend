import axios from "axios";

const baseUrl = axios.create({
  // baseURL: "http://10.10.7.105:5000/api/v1",
  baseURL: "http://localhost:5000/api/v1",
});

export default baseUrl;
