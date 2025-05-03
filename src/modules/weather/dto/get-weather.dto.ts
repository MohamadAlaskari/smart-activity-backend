import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetWeatherDto {
  @ApiProperty({
    description: 'City or location for which to fetch the weather',
    example: 'Berlin',
  })
  @IsString()
  location: string;
}
