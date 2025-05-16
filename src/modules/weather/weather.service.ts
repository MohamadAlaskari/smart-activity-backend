import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DayForecast } from './interfaces/weather-week-forecast.interface';

interface VisualCrossingResponse {
  days: DayForecast[];
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeekForecast(location: string): Promise<DayForecast[]> {
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;
    if (!apiKey)
      throw new ServiceUnavailableException(
        'VISUAL_CROSSING_API_KEY is missing',
      );

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
      const res = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );
      return res.data.days.map((day) => this.mapDayForecast(day));
    } catch (error) {
      console.error(
        'Visual Crossing API error:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      throw new InternalServerErrorException(
        'Weekly forecast could not be fetched',
      );
    }
  }

  private mapDayForecast(day: DayForecast): DayForecast {
    const {
      datetime,
      tempmax,
      tempmin,
      temp,
      feelslikemax,
      feelslikemin,
      feelslike,
      dew,
      humidity,
      precip,
      precipprob,
      precipcover,
      preciptype,
      snow,
      snowdepth,
      windgust,
      windspeed,
      winddir,
      pressure,
      cloudcover,
      visibility,
      solarradiation,
      solarenergy,
      uvindex,
      severerisk,
      sunrise,
      sunset,
      moonphase,
      conditions,
      description,
      icon,
    } = day;

    return {
      datetime: datetime,
      tempmax,
      tempmin,
      temp,
      feelslikemax,
      feelslikemin,
      feelslike,
      dew,
      humidity,
      precip,
      precipprob,
      precipcover,
      preciptype,
      snow,
      snowdepth,
      windgust,
      windspeed,
      winddir,
      pressure,
      cloudcover,
      visibility,
      solarradiation,
      solarenergy,
      uvindex,
      severerisk,
      sunrise,
      sunset,
      moonphase,
      conditions,
      description,
      icon,
    };
  }
}
