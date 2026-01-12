import { useState, useEffect, useCallback } from "react";
import { type Location, type FavoriteLocation } from "@/entities/location";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(() => {
    const saved = localStorage.getItem("weather_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // LocalStorage 동기화
  useEffect(() => {
    localStorage.setItem("weather_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 즐겨찾기 토글 (추가/삭제)
  const toggleFavorite = useCallback((location: Location) => {
    setFavorites((prev) => {
      const isExist = prev.find((f) => f.fullPath === location.fullPath);

      // 이미 있으면 삭제
      if (isExist) {
        return prev.filter((f) => f.fullPath !== location.fullPath);
      }

      // 6개 제한 로직
      if (prev.length >= 6) {
        alert("최대 6개까지 가능합니다.");
        return prev;
      }

      // 없으면 추가
      return [...prev, { ...location, nickname: "" }];
    });
  }, []);

  // 닉네임 수정 (rename)
  const renameFavorite = useCallback((path: string, newName: string) => {
    setFavorites((prev) =>
      prev.map((f) => (f.fullPath === path ? { ...f, nickname: newName } : f))
    );
  }, []);

  // 직접 삭제 (remove)
  const removeFavorite = useCallback((path: string) => {
    setFavorites((prev) => prev.filter((f) => f.fullPath !== path));
  }, []);

  return {
    favorites,
    setFavorites, // 필요한 경우 대비
    toggleFavorite,
    renameFavorite,
    removeFavorite,
  };
};
