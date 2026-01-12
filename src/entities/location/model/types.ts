export interface Location {
  fullPath: string; // "서울특별시-종로구-청운동"
  cityName: string; // "서울특별시"
  districtName: string; // "종로구"
  townName: string; // "청운동"
  displayName: string; // 화면에 보여줄 이름 (예: "청운동")
}
export interface Coords {
  lat: number;
  lon: number;
}
export interface FavoriteLocation extends Location {
  nickname: string;
}
