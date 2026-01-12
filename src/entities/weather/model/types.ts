export interface WeatherInfo {
  temp: number; // 현재 기온
  tempMin: number; // 최저 기온
  tempMax: number; // 최고 기온
  description: string; // 날씨 설명 (맑음, 흐림 등)
  icon: string; // 날씨 아이콘 코드
}

export interface HourlyForecast {
  time: string; // 시간대 (15:00 등)
  temp: number; // 기온
}

export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt?: string; // 예보 데이터에 들어있음
}

export interface WeatherResponse {
  current: WeatherData & { name: string };
  forecast: {
    list: WeatherData[];
  };
}
