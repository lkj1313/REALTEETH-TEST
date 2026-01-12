interface Props {
  temp: number;
  tempMax: number;
  tempMin: number;
  main: string;
  icon: string;
  displayName: string;
}

export const CurrentWeatherCard = ({
  temp,
  tempMax,
  tempMin,
  main,
  icon,
  displayName,
}: Props) => (
  <section className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-[40px] text-white shadow-lg relative overflow-hidden">
    <div className="relative z-10">
      <p className="text-lg font-medium opacity-90 mb-1">
        {displayName || "내 주변"}
      </p>
      <h2 className="text-6xl font-bold mb-4">{Math.round(temp)}°</h2>
      <div className="flex items-center gap-2">
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-md">
          {main}
        </span>
        <span className="text-sm opacity-80">
          최고 {Math.round(tempMax)}° / 최저 {Math.round(tempMin)}°
        </span>
      </div>
    </div>
    <img
      src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
      className="absolute -right-4 -bottom-4 w-40 h-40 opacity-50"
      alt="weather-icon"
    />
  </section>
);
