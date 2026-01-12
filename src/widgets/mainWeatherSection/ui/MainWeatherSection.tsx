import { useWeatherQuery } from "@/entities/weather";
import { Loading } from "@/shared/ui/Loading";
import {
  CurrentWeatherCard,
  HourlyForecast,
  WeatherInfoCard,
} from "@/entities/weather";

export const MainWeatherSection = ({
  lat,
  lon,
  displayName,
}: {
  lat: number;
  lon: number;
  displayName: string;
}) => {
  const { data, isLoading, error } = useWeatherQuery(lat, lon);

  if (isLoading) return <Loading />;
  if (error || !data)
    return <div className="p-8 text-center">데이터를 불러올 수 없습니다.</div>;

  return (
    <article className="space-y-6">
      <CurrentWeatherCard
        temp={data.current.main.temp}
        tempMax={data.current.main.temp_max}
        tempMin={data.current.main.temp_min}
        main={data.current.weather[0].main}
        icon={data.current.weather[0].icon}
        displayName={displayName}
      />

      <HourlyForecast list={data.forecast.list} />

      <section className="grid grid-cols-2 gap-4">
        <WeatherInfoCard
          label="습도"
          value={`${data.current.main.humidity}%`}
        />
        <WeatherInfoCard
          label="풍속"
          value={`${data.current.wind.speed} m/s`}
        />
      </section>
    </article>
  );
};
