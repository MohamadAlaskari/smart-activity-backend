import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDirectionsDto {
  @ApiProperty({
    description: 'Startort (z. B. aktuelle Position)',
    example: 'Berlin',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Zielort',
    example: 'Botanischer Garten, Berlin',
  })
  @IsString()
  destination: string;

  @ApiProperty({
    description: 'Transportmittel',
    example: 'walking',
    enum: ['driving', 'walking', 'bicycling', 'transit'],
    default: 'driving',
  })
  @IsString()
  @IsIn(['driving', 'walking', 'bicycling', 'transit'])
  mode: 'driving' | 'walking' | 'bicycling' | 'transit';
}
