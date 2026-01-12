import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/entities/weather";

export const useWeatherQuery = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 5 * 60 * 1000,
  });
};
