import { useState, useCallback } from "react";
import { useCurrentLocation } from "@/shared";

export const useHomeLocation = () => {
  const DEFAULT_COORDS = { lat: 37.5665, lon: 126.978, name: "Seoul" };
  const { coords: myCoords, error: locError } = useCurrentLocation();
  const [selected, setSelected] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  const handleSelectLocation = useCallback(
    (coords: { lat: number; lon: number }, name: string) => {
      setSelected({ ...coords, name });
    },
    []
  );

  // 우선순위: 1. 직접 선택  2. 내 현재 위치  3. 기본값(서울)
  const display =
    selected || (myCoords ? { ...myCoords, name: "" } : DEFAULT_COORDS);

  return {
    display,
    locError: locError && !selected,
    handleSelectLocation,
  };
};
