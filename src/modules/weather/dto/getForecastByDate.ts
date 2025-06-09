import { IsDateString, IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetForecastByDateDto {
  @ApiProperty({
    example: 52.52,
    description: 'Latitude coordinate of the location',
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    example: 13.405,
    description: 'Longitude coordinate of the location',
  })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    example: '2025-06-15',
    description: 'Date for which the forecast is requested (YYYY-MM-DD)',
  })
  @IsDateString()
  date: string;
}
