import { ApiProperty } from '@nestjs/swagger';

export class DayForecastDto {
  @ApiProperty() date: string;
  @ApiProperty() tempmax: number;
  @ApiProperty() tempmin: number;
  @ApiProperty() temp: number;
  @ApiProperty() feelslikemax: number;
  @ApiProperty() feelslikemin: number;
  @ApiProperty() feelslike: number;
  @ApiProperty() dew: number;
  @ApiProperty() humidity: number;
  @ApiProperty() precip: number;
  @ApiProperty() precipprob: number;
  @ApiProperty() precipcover: number;
  @ApiProperty({ isArray: true, required: false }) preciptype?: string[];
  @ApiProperty() snow: number;
  @ApiProperty() snowdepth: number;
  @ApiProperty() windgust: number;
  @ApiProperty() windspeed: number;
  @ApiProperty() winddir: number;
  @ApiProperty() pressure: number;
  @ApiProperty() cloudcover: number;
  @ApiProperty() visibility: number;
  @ApiProperty() solarradiation: number;
  @ApiProperty() solarenergy: number;
  @ApiProperty() uvindex: number;
  @ApiProperty() severerisk: number;
  @ApiProperty() sunrise: string;
  @ApiProperty() sunset: string;
  @ApiProperty() moonphase: number;
  @ApiProperty() conditions: string;
  @ApiProperty() description: string;
  @ApiProperty() icon: string;
}
