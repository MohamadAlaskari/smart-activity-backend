import { ApiProperty } from '@nestjs/swagger';

export class SuggestionLocationDto {
  @ApiProperty({ example: 'Volkspark Friedrichshain' })
  name: string;

  @ApiProperty({ example: 'Friedrichshain, Berlin' })
  address: string;

  @ApiProperty({ example: 52.5283 })
  lat: number;

  @ApiProperty({ example: 13.431 })
  lon: number;
}

export class SuggestionResultDto {
  @ApiProperty({ example: 'Open-Air Yoga im Park' })
  title: string;

  @ApiProperty({
    example: 'Entspannende Yoga-Session unter freiem Himmel. Matte mitbringen.',
  })
  description: string;

  @ApiProperty({ example: 'Health & Wellness' })
  category: string;

  @ApiProperty({ type: SuggestionLocationDto })
  location: SuggestionLocationDto;

  @ApiProperty({ example: 2.3 })
  distanceKm: number;

  @ApiProperty({ example: '2025-06-03T09:30:00' })
  startTime: string;

  @ApiProperty({ example: '2025-06-03T11:00:00' })
  endTime: string;

  @ApiProperty({ example: 'Free' })
  price: string;

  @ApiProperty({ example: false })
  isTicketed: boolean;

  @ApiProperty({ example: ['Outdoors', 'Chill'], isArray: true })
  vibeMatch: string[];
}
