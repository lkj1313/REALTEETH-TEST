interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}
export const SearchInput = ({
  value,
  onChange,
  onFocus,
  inputRef,
}: SearchInputProps) => (
  <div className="relative flex items-center">
    <span className="absolute left-4 z-10 text-slate-400">🔍</span>
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      placeholder="지역 검색 (예: 대구)"
      className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-[24px] shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
    />
  </div>
);
