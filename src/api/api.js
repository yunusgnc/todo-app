import axios from "axios";

const baseURL = "http://localhost:4000/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "app-id": "656c9e8d349a334e1d3c75c9",
  },
});

export default api;
