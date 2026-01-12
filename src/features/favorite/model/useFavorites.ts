import { useFavoriteStore } from "@/entities/location";

export const useFavorites = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const renameFavorite = useFavoriteStore((state) => state.renameFavorite);

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    renameFavorite,
  };
};
