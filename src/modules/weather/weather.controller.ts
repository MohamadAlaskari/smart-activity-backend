import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from 'src/modules/weather/weather.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetWeatherDto } from './dto/get-weather.dto';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Liefert aktuelles Wetter für einen Ort' })
  @ApiResponse({
    status: 200,
    description: 'Wetterdaten erfolgreich zurückgegeben',
  })
  async getWeather(@Query() query: GetWeatherDto) {
    return this.weatherService.getCurrentWeather(query.location);
  }
}
