export interface DayForecast {
  [key: string]: number | string | string[] | undefined;
}

export interface VisualCrossingResponse {
  days: DayForecast[];
}
