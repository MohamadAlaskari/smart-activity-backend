import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DayForecastDto } from './dto/day-forecast.dto';
import { AppConfigService } from 'src/common/app-config.service';
import { VISUAL_CROSSING_BASE_URL } from 'src/common/utils/constants/weather.constants';
import {
  DayForecast,
  VisualCrossingResponse,
} from './interfaces/weather-week-forecast.interface';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.apiKey = this.appConfigService.visualCrossingApiKey;
  }

  async getWeekForecast(location: string): Promise<DayForecastDto[]> {
    const url = this.buildForecastUrl(location);

    try {
      const response = await firstValueFrom(
        this.httpService.get<VisualCrossingResponse>(url),
      );
      return response.data.days.map((day) => this.mapToDto(day));
    } catch {
      throw new InternalServerErrorException(
        'Could not fetch weather forecast',
      );
    }
  }

  private buildForecastUrl(location: string): string {
    return `${VISUAL_CROSSING_BASE_URL}/${location}?unitGroup=metric&key=${this.apiKey}&contentType=json`;
  }

  private mapToDto(day: DayForecast): DayForecastDto {
    const dto = new DayForecastDto();
    dto.date = day.datetime;
    Object.assign(dto, day);
    return dto;
  }
}
