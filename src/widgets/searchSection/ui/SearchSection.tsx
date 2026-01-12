import { memo, useRef, useEffect } from "react";
import { useSearchForm } from "@/features/searchLocation";
import { useFavorites } from "@/features/favorite";
import { searchLocations, type Coords } from "@/entities/location";
import { SearchInput, SearchResultList } from "@/features/searchLocation";

interface SearchSectionProps {
  onSelectLocation: (coords: Coords, name: string) => void;
}

export const SearchSection = memo(
  ({ onSelectLocation }: SearchSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
      keyword,
      setKeyword,
      results,
      setResults,
      isSelecting,
      debouncedSearch,
      handleSelect,
    } = useSearchForm(onSelectLocation, inputRef);

    const { favorites, toggleFavorite } = useFavorites();

    // 외부 클릭 시 닫기
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setResults([]);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setResults]);

    return (
      <section className="relative w-full mb-8" ref={containerRef}>
        <SearchInput
          inputRef={inputRef}
          value={keyword}
          onChange={(val) => {
            setKeyword(val);
            debouncedSearch(val);
          }}
          onFocus={() => {
            if (!isSelecting && keyword.trim().length > 0)
              setResults(searchLocations(keyword));
          }}
        />
        <SearchResultList
          results={results}
          isSelecting={isSelecting}
          keyword={keyword}
          favorites={favorites}
          onSelect={handleSelect}
          onToggleFavorite={(e, loc) => {
            e.stopPropagation();
            toggleFavorite(loc);
          }}
        />
      </section>
    );
  }
);
