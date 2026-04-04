export interface WeatherData {
    cityName: string,
    country: string,
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    hourly: Current[];
    daily: Daily[];
    alerts: Alert[];
}

export interface Alert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
}

export interface Current {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop?: number;
    rain?: Rain;
}

export interface Rain {
    "1h": number;
}

export type WeatherMain =
    | "Clear"
    | "Clouds"
    | "Rain"
    | "Drizzle"
    | "Thunderstorm"
    | "Snow"
    | "Mist"
    | "Smoke"
    | "Haze"
    | "Dust"
    | "Fog"
    | "Sand"
    | "Ash"
    | "Squall"
    | "Tornado";

export interface Weather {
    id: number;
    main: WeatherMain | (string & {});
    description: string;
    icon: string;
}

export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Minutely {
    dt: number;
    precipitation: number;
}
