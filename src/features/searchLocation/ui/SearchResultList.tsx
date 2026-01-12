import type { Location, FavoriteLocation } from "@/entities/location";

interface SearchResultListProps {
  results: Location[];
  isSelecting: boolean;
  keyword: string;
  favorites: FavoriteLocation[];
  onSelect: (loc: Location) => void;
  onToggleFavorite: (e: React.MouseEvent, loc: Location) => void;
}

export const SearchResultList = ({
  results,
  isSelecting,
  keyword,
  favorites,
  onSelect,
  onToggleFavorite,
}: SearchResultListProps) => {
  // 렌더링 방어 조건
  if (results.length === 0 || isSelecting || keyword.length === 0) return null;

  return (
    <ul className="absolute z-50 w-full mt-2 bg-white rounded-3xl shadow-2xl max-h-80 overflow-y-auto py-2 border border-slate-100 scrollbar-hide">
      {results.map((loc) => {
        const isFav = favorites.some((f) => f.fullPath === loc.fullPath);
        return (
          <li
            key={loc.fullPath}
            onClick={() => onSelect(loc)}
            className="px-6 py-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between group"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700">
                {loc.fullPath.replace(/-/g, " ")}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">
                South Korea
              </span>
            </div>
            <button
              onClick={(e) => onToggleFavorite(e, loc)}
              className={`p-2 rounded-full transition-colors ${
                isFav
                  ? "text-yellow-400"
                  : "text-slate-200 hover:text-yellow-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
