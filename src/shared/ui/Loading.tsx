import { memo } from "react";

interface LoadingProps {
  fullScreen?: boolean;
}

export const Loading = memo(({ fullScreen = false }: LoadingProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-24"
      }`}
    >
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
});
