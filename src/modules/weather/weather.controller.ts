import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from 'src/modules/weather/weather.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetWeekWeatherDto } from './dto/get-week-weather.dto';
import { DayForecastDto } from './dto/day-forecast.dto';
import { DayForecast } from './interfaces/weather-week-forecast.interface';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('week')
  @ApiOperation({ summary: 'Get 7-day weather forecast for a location' })
  @ApiResponse({
    status: 200,
    description: 'Returns the 7-day weather forecast with all weather fields',
    type: [DayForecastDto], // ✅ KLASSE statt Interface
  })
  async getWeekForecast(
    @Query() query: GetWeekWeatherDto,
  ): Promise<DayForecast[]> {
    return this.weatherService.getWeekForecast(query.location);
  }
}
