import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/portal",
});

// Citizens
export const addCitizen = (citizen) => API.post("/citizens", citizen);

// Admins
export const addAdmin = (admin) => API.post("/admins", admin);
export const getAdmins = () => API.get("/admins");

// Weather
export const getWeather = (city) => API.get(`/weather/${city}`);

// Reports (PDF download)
export const generateReport = (reportConfig) =>
  API.post("/reports", reportConfig, { responseType: "blob" });

export default API;