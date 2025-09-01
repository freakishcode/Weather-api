import { useQuery } from "@tanstack/react-query";

// Importing necessary API client and utility functions
import { weatherAPI, UNITS } from "../api/weatherClient";

// Importing type conversion function to shape the current weather data
import { toCurrentShape } from "../types/weather-shapes";

// Custom hook to fetch current weather data for a given city and units
export const useCurrentWeather = (city, units = UNITS.metric) => {
  return useQuery({
    queryKey: ["current", city, units],
    queryFn: () => weatherAPI.currentByCity(city, units),
    enabled: Boolean(city),
    select: toCurrentShape,
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
