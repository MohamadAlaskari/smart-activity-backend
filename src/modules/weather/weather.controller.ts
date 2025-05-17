import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeekWeatherDto } from './dto/get-week-weather.dto';
import { DayForecastDto } from './dto/day-forecast.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('week')
  @ApiOperation({ summary: 'Get 7-day weather forecast for a location' })
  @ApiResponse({
    status: 200,
    description: 'Returns the 7-day weather forecast',
    type: [DayForecastDto],
  })
  async getWeekForecast(
    @Query() query: GetWeekWeatherDto,
  ): Promise<DayForecastDto[]> {
    return this.weatherService.getWeekForecast(query.location);
  }
}
