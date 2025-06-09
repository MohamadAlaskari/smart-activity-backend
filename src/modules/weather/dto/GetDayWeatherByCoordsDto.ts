import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetDayWeatherByCoordsDto {
  @ApiProperty({ example: '0', description: 'day number 0 for today' })
  @Type(() => Number)
  @IsNumber()
  dayNumber: number;

  @ApiProperty({ example: 52.52, description: 'Latitude of the location' })
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 13.405, description: 'Longitude of the location' })
  @Type(() => Number)
  @IsNumber()
  longitude: number;
}
