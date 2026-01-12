import { useFavorites } from "@/features/favorite/";
import { FavoriteGrid } from "@/features/favorite";

export const FavoriteSection = () => {
  const { favorites, removeFavorite, renameFavorite } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <section className="px-1 mb-8">
      <h3 className="mb-4 font-bold text-slate-700">
        즐겨찾는 지역 ({favorites.length}/6)
      </h3>
      <FavoriteGrid
        favorites={favorites}
        onRemove={removeFavorite}
        onRename={renameFavorite}
      />
    </section>
  );
};
