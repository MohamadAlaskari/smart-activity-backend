import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetEventsFlatDto {
    @ApiProperty({
        description: 'Breitengrad (Latitude)',
        example: 52.52,
    })
    @IsNumber()
    @Type(() => Number)
    lat: number;

    @ApiProperty({
        description: 'Längengrad (Longitude)',
        example: 13.405,
    })
    @IsNumber()
    @Type(() => Number)
    lon: number;

    @ApiProperty({
        description: 'Startdatum im Format YYYY-MM-DD',
        example: '2025-06-10',
    })
    @IsString()
    startDate: string;

    @ApiPropertyOptional({
        description: 'Radius in Kilometern (Standard: 100)',
        example: 50,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    radius?: number;

    @ApiPropertyOptional({
        description: 'Anzahl der Events, max. 200 (Standard: 50)',
        example: 50,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    size?: number;
}
