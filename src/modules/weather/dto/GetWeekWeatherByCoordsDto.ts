import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetWeekWeatherByCoordsDto {
  @ApiProperty({ example: 52.52, description: 'Latitude of the location' })
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 13.405, description: 'Longitude of the location' })
  @Type(() => Number)
  @IsNumber()
  longitude: number;
}
