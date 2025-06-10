import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsLatitude,
    IsLongitude,
    IsString,
} from 'class-validator';

export class CreateSuggestionDto {
    @ApiProperty({
        example: 'f2fb62f9-399f-4582-8efb-ac1c6ac9c21c',
        description: 'User ID',
    })
    @IsString()
    userId: string;

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
