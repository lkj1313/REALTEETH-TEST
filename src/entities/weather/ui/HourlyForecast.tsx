import { useHorizontalScroll } from "@/shared";
import { type WeatherData } from "../model/types";

export const HourlyForecast = ({ list }: { list: WeatherData[] }) => {
  const sectionRef = useHorizontalScroll();

  return (
    <section
      ref={sectionRef}
      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
    >
      <h3 className="font-bold mb-5 text-slate-800 flex items-center gap-2 text-sm select-none">
        <span className="text-lg">🕒</span> 24시간 예보
      </h3>

      <div className="scroll-container flex overflow-x-auto gap-4 pb-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none">
        {list.slice(0, 16).map((item) => (
          <div
            key={item.dt}
            className="text-center min-w-[75px] flex-shrink-0 bg-slate-50 rounded-2xl p-4 border border-slate-50 transition-all hover:bg-blue-50 hover:border-blue-100"
          >
            <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">
              {new Date(item.dt * 1000).getHours()}시
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="icon"
              className="mx-auto w-10 h-10"
            />
            <p className="font-bold text-slate-800 text-lg mt-1">
              {Math.round(item.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
