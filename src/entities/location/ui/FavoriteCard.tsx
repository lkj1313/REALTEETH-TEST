import { memo } from "react";

interface FavoriteCardProps {
  displayName: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  weatherIcon: string;
  isLoading?: boolean;
  onRemove: (e: React.MouseEvent) => void;
  onRename: (newName: string) => void;
  onClick: () => void;
}

export const FavoriteCard = memo(
  ({
    displayName,
    temp,
    tempMin,
    tempMax,
    weatherIcon,
    isLoading,
    onRemove,
    onRename,
    onClick,
  }: FavoriteCardProps) => {
    if (isLoading) {
      return (
        <div className="h-32 bg-slate-50 animate-pulse rounded-[32px] border border-slate-100" />
      );
    }

    return (
      <div
        onClick={onClick}
        className="relative p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group overflow-hidden"
      >
        {/* 삭제 버튼 */}
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 text-slate-300 hover:text-red-400 p-1 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative z-10">
          <div className="mb-1 pr-6">
            <input
              type="text"
              className="w-full font-bold text-slate-800 bg-transparent border-none p-0 focus:ring-0 text-base overflow-hidden text-ellipsis whitespace-nowrap"
              value={displayName}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onRename(e.target.value)}
              placeholder="이름 수정"
            />
            <p className="text-[10px] text-slate-400 uppercase font-medium tracking-tight">
              South Korea
            </p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-900 tracking-tighter">
                {Math.round(temp)}°
              </span>
              <div className="flex gap-1.5 mt-1 text-[11px] font-semibold">
                <span className="text-blue-500">↓{Math.round(tempMin)}°</span>
                <span className="text-red-500">↑{Math.round(tempMax)}°</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-1">
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
                alt="weather"
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
