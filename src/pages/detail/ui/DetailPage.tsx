import { useParams, useNavigate } from "react-router-dom";

import { MainWeatherSection } from "@/widgets/mainWeatherSection";

export const DetailPage = () => {
  const { lat, lon, name } = useParams();
  const navigate = useNavigate();

  const latitude = lat ? Number(lat) : null;
  const longitude = lon ? Number(lon) : null;
  const displayName = decodeURIComponent(name || "");

  if (latitude === null || longitude === null) {
    return (
      <div className="text-center py-20 text-slate-400">잘못된 접근입니다.</div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto px-4 pb-12">
      <header className="flex items-center gap-4 mb-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">날씨 상세 정보</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            Forecast Detail
          </p>
        </div>
      </header>

      <MainWeatherSection
        lat={latitude}
        lon={longitude}
        displayName={displayName}
      />
    </div>
  );
};
