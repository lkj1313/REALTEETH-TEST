const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherData = async (lat: number, lon: number) => {
  const baseUrl = "https://api.openweathermap.org/data/2.5";

  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=kr`
    ),
    fetch(
      `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=kr`
    ),
  ]);

  if (!currentRes.ok || !forecastRes.ok) throw new Error("날씨 호출 실패");

  return {
    current: await currentRes.json(),
    forecast: await forecastRes.json(),
  };
};
