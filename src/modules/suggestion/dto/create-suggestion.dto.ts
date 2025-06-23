import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsLatitude, IsLongitude } from 'class-validator';

export class CreateSuggestionDto {
    @ApiProperty({ example: 53.0793, description: 'Latitude' })
    @IsLatitude()
    lat: number;

    @ApiProperty({ example: 8.8017, description: 'Longitude' })
    @IsLongitude()
    lon: number;

    @ApiProperty({
        example: '2025-06-10',
        description: 'Date for activity suggestions',
    })
    @IsDateString()
    date: string;
}
