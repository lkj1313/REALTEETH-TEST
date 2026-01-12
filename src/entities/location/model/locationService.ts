import type { Location } from "./types";
import rawData from "@/shared/api/korea_districts.json";

const allLocationsCache: Location[] = rawData.map((path) => {
  const parts = path.split("-");

  return {
    fullPath: path,
    cityName: parts[0] || "",
    districtName: parts[1] || "",
    townName: parts[2] || "",
    displayName: path.replace(/-/g, " "),
  };
});

export const getAllLocations = (): Location[] => allLocationsCache;

function normalize(s: string) {
  return s.replace(/\s+/g, "").toLowerCase();
}

function scoreLocation(query: string, loc: Location): number {
  const q = normalize(query);
  const full = normalize(loc.displayName);
  const city = normalize(loc.cityName);
  const district = normalize(loc.districtName);
  const town = normalize(loc.townName);

  if (!q) return -Infinity;

  // 1️ 도시명 완전/시작 일치 최우선
  if (city === q) return 1_000_000;
  if (city.startsWith(q)) return 950_000;

  // 2️ 전체 경로 시작
  if (full.startsWith(q)) return 900_000;

  // 3️ 구 / 동 시작
  if (district.startsWith(q)) return 850_000;
  if (town.startsWith(q)) return 840_000;

  // 4️포함 관계 (앞에 나올수록 가중치)
  const idx =
    full.indexOf(q) !== -1
      ? full.indexOf(q)
      : city.indexOf(q) !== -1
      ? city.indexOf(q)
      : district.indexOf(q) !== -1
      ? district.indexOf(q)
      : town.indexOf(q);

  if (idx !== -1) return 700_000 - idx;

  return -Infinity;
}

export const searchLocations = (query: string): Location[] => {
  const q = query.trim();
  if (!q) return [];

  return allLocationsCache
    .map((loc) => ({ loc, score: scoreLocation(q, loc) }))
    .filter((x) => x.score > -Infinity)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.loc);
};
