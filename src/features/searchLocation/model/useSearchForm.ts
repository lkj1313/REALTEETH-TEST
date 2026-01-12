import { useState, useMemo } from "react";
import { debounce } from "lodash";
import {
  searchLocations,
  getCoordinatesByAddress,
  type Location,
  type Coords,
} from "@/entities/location";

export const useSearchForm = (
  onSelectLocation: (coords: Coords, name: string) => void,
  inputRef: React.RefObject<HTMLInputElement | null>
) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  // 검색 로직: 입력값에 따라 검색 결과 업데이트
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (isSelecting) return;
        const searchVal = value.trim();
        setResults(searchVal ? searchLocations(searchVal) : []);
      }, 150),
    [isSelecting]
  );

  // 선택 로직: 리스트에서 항목 클릭 시 좌표를 가져오고 콜백 실행
  const handleSelect = async (location: Location) => {
    setIsSelecting(true);
    setResults([]);
    setKeyword("");

    // 인풋 포커스 해제
    if (inputRef.current) {
      inputRef.current.blur();
    }

    try {
      const coords = await getCoordinatesByAddress(location.fullPath);
      const regionName = location.fullPath.split("-").pop() || "";
      onSelectLocation(coords, regionName);
    } finally {
      // 선택 후 즉시 검색 결과가 다시 나타나지 않도록 약간의 지연 후 상태 해제
      setTimeout(() => setIsSelecting(false), 100);
    }
  };

  return {
    keyword,
    setKeyword,
    results,
    setResults,
    isSelecting,
    debouncedSearch,
    handleSelect,
  };
};
