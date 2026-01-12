import { SearchSection } from "@/widgets/searchSection/ui/SearchSection";
import { FavoriteSection } from "@/widgets/favoriteSection";
import { useHomeLocation } from "../model/useHomeLocation";
import { MainWeatherSection } from "@/widgets/mainWeatherSection/ui/MainWeatherSection";

export const HomePage = () => {
  const { display, locError, handleSelectLocation } = useHomeLocation();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-800 pt-4">
        Weather Cast
      </h1>

      <SearchSection onSelectLocation={handleSelectLocation} />
      <FavoriteSection />

      {locError && (
        <div className="mb-4 p-3 bg-amber-50 text-amber-700 text-xs rounded-lg border border-amber-100">
          ⚠️ 위치 권한이 거부되어 기본 위치의 날씨를 보여드립니다.
        </div>
      )}

      <MainWeatherSection
        lat={display.lat}
        lon={display.lon}
        displayName={display.name}
      />
    </>
  );
};
