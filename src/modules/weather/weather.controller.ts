import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeekWeatherDto } from './dto/get-week-weather.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  //ApiBearerAuth,
} from '@nestjs/swagger';
//import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetWeekWeatherByCoordsDto } from './dto/GetWeekWeatherByCoordsDto';

//@UseGuards(AuthGuard)
//@ApiBearerAuth()
@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('week')
  @ApiOperation({ summary: 'Get 7-day weather forecast for a location' })
  @ApiResponse({
    status: 200,
    description: 'Returns the 7-day weather forecast',
  })
  async getWeekForecast(@Query() query: GetWeekWeatherDto): Promise<any> {
    return this.weatherService.getWeekForecastByLocation(query.location);
  }

  @Get('week/coordinates')
  @ApiOperation({ summary: 'Get 7-day weather forecast by coordinates' })
  @ApiResponse({
    status: 200,
    description: 'Returns the 7-day forecast for given coordinates',
  })
  async getWeekForecastByCoordinates(
    @Query() query: GetWeekWeatherByCoordsDto,
  ): Promise<any> {
    return this.weatherService.getWeekForecastByCoordinates(
      query.latitude,
      query.longitude,
    );
  }

  @Get('week/hours/coordinates')
  @ApiOperation({
    summary: 'Get hourly forecast for the next 7 days by coordinates',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all hourly forecasts over the next 7 days',
  })
  async getHourlyForecastByCoordinates(
    @Query() query: GetWeekWeatherByCoordsDto,
  ): Promise<any[]> {
    return this.weatherService.getDaysHourlyForecastByCoordinates(
      query.latitude,
      query.longitude,
    );
  }
}
