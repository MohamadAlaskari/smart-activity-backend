import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetWeekWeatherDto {
  @ApiProperty({
    description: 'City or location for which to get the weekly forecast',
    example: 'Berlin',
  })
  @IsString()
  location: string;
}
