import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Location, type FavoriteLocation } from "./types"; // 경로 확인 필요

interface FavoriteState {
  favorites: FavoriteLocation[];
  toggleFavorite: (location: Location) => void;
  removeFavorite: (path: string) => void;
  renameFavorite: (path: string, newName: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (location) =>
        set((state) => {
          const isExist = state.favorites.find(
            (f) => f.fullPath === location.fullPath
          );

          // 1. 이미 존재하면 삭제
          if (isExist) {
            return {
              favorites: state.favorites.filter(
                (f) => f.fullPath !== location.fullPath
              ),
            };
          }

          // 2. 6개 제한 체크
          if (state.favorites.length >= 6) {
            alert("최대 6개까지 가능합니다.");
            return state;
          }

          // 3. 신규 추가
          return {
            favorites: [...state.favorites, { ...location, nickname: "" }],
          };
        }),

      removeFavorite: (path) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.fullPath !== path),
        })),

      renameFavorite: (path, newName) =>
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.fullPath === path ? { ...f, nickname: newName } : f
          ),
        })),
    }),
    {
      name: "weather_favorites",
    }
  )
);
