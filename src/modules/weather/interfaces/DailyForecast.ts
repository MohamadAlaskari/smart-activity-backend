export interface DailyForecast {
    datetime: string;
    tempmax: number;
    tempmin: number;
    icon: string;
}

export interface VisualCrossingWeatherResponse {
    days: DailyForecast[];
}
