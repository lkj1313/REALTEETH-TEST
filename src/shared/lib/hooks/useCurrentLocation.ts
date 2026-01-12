import { useState, useEffect } from "react";

export const useCurrentLocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const [error, setError] = useState<string | null>(
    typeof window !== "undefined" && !navigator.geolocation
      ? "이 브라우저에서는 위치 정보를 지원하지 않습니다."
      : null
  );

  useEffect(() => {
    // 이미 지원하지 않는 경우 실행 방지
    if (!navigator.geolocation || error) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("위치 정보를 가져오는데 실패했습니다.");
        console.error(err);
      }
    );
  }, [error]);

  return { coords, error };
};
