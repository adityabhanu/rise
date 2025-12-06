import axios from "axios";

const http = axios.create({
  baseURL: "https://your-api-url.com",
  timeout: 10000,
});

export default http;
