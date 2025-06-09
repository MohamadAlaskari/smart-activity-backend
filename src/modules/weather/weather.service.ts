import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '../../common/app-config.service';
import { VISUAL_CROSSING_BASE_URL } from 'src/common/utils/constants/weather.constants';
import { VisualCrossingResponse } from './interfaces/weather-week-forecast.interface';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.apiKey = this.appConfigService.visualCrossingApiKey;
  }

  async getWeekForecastByLocation(location: string): Promise<any> {
    const url = this.buildForecastUrl(location, 'today/next7days');

    try {
      const response = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );
      return response.data.days.map((day) => ({
        ...day,
      }));
    } catch {
      throw new InternalServerErrorException(
        'Could not fetch weather forecast',
      );
    }
  }

  async getWeekForecastByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<any> {
    const location = `${latitude},${longitude}`;
    const url = this.buildForecastUrl(location, 'today/next7days');

    try {
      const response = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );
      return response.data.days.map((day) => ({
        ...day,
      }));
    } catch {
      throw new InternalServerErrorException(
        'Could not fetch forecast from today',
      );
    }
  }
  async getDaysHourlyForecastByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<any[]> {
    const location = `${latitude},${longitude}`;
    const url = this.buildForecastUrl(location, 'today/next0days', 'hours');

    try {
      const response = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );

      return response.data.days.map((day) => ({
        ...day,
      }));
    } catch {
      throw new InternalServerErrorException('Could not fetch hourly forecast');
    }
  }
  async getDayHourlyForecastByCoordinates(
    latitude: number,
    longitude: number,
    dayNumber: number,
  ): Promise<any> {
    const location = `${latitude},${longitude}`;
    const url = this.buildForecastUrl(
      location,
      `today/next${dayNumber}days`,
      'hours',
    );

    try {
      const response = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );

      return response.data.days[dayNumber];
    } catch {
      throw new InternalServerErrorException('Could not fetch hourly forecast');
    }
  }

  async getForecastByDate(
    latitude: number,
    longitude: number,
    date: string,
  ): Promise<any> {
    const location = `${latitude},${longitude}`;
    const url = this.buildForecastUrl(location, date, 'hours');

    try {
      const response = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );
      return response.data.days;
    } catch {
      throw new InternalServerErrorException(
        'Could not fetch forecast for date',
      );
    }
  }

  private buildForecastUrl(
    location: string,
    range: string = '',
    include: string = 'days',
  ): string {
    const dateRange = range ? `/${range}` : '';
    return `${VISUAL_CROSSING_BASE_URL}/${location}${dateRange}?unitGroup=metric&key=${this.apiKey}&contentType=json&include=${include}`;
  }
}
