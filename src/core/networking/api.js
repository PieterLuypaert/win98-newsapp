import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// // 1 seconden vertraging voor elke response
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

API.interceptors.response.use(async (response) => {
  await delay(1000);
  return response;
});

export default API;
