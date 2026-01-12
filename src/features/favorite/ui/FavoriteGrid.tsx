import { type FavoriteLocation } from "@/entities/location";
import { FavoriteCardItem } from "./FavoriteCardItem";

interface Props {
  favorites: FavoriteLocation[];
  onRemove: (path: string) => void;
  onRename: (path: string, name: string) => void;
}

export const FavoriteGrid = ({ favorites, onRemove, onRename }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {favorites.map((fav) => (
        <FavoriteCardItem
          key={fav.fullPath}
          fav={fav}
          onRemove={onRemove}
          onRename={onRename}
        />
      ))}
    </div>
  );
};
