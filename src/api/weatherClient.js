import axios from "axios";

// 🔐 Per your request: API key is embedded in the code (NOT in .env)
// Replace with your actual OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

// Define the units for temperature
export const UNITS = {
  metric: "metric", // °C
  imperial: "imperial", // °F
};

// Create an Axios client with a base URL and timeout
const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

// Inject key & default params
client.interceptors.request.use((config) => {
  const params = new URLSearchParams(config.params || {});
  if (!params.has("appid")) params.set("appid", API_KEY);
  if (!params.has("units")) params.set("units", UNITS.metric);
  return { ...config, params };
});

export const weatherAPI = {
  // Fetch the current weather for a given city
  currentByCity: async (q, units = UNITS.metric) => {
    const { data } = await client.get("/weather", { params: { q, units } });
    return data;
  },

  // Fetch the weather forecast for a given city
  forecastByCity: async (q, units = UNITS.metric) => {
    const { data } = await client.get("/forecast", { params: { q, units } });
    return data;
  },
};
