import { useQuery } from "@tanstack/react-query";
import { weatherAPI, UNITS } from "../api/weatherClient";
import { toForecastItems } from "../types/weather-shapes";

export const useForecast = (city, units = UNITS.metric) => {
  return useQuery({
    queryKey: ["forecast", city, units],
    queryFn: () => weatherAPI.forecastByCity(city, units),
    enabled: Boolean(city),
    select: toForecastItems,
    staleTime: 1000 * 60 * 10, // 10 min
  });
};
