// src/modules/health-data/dto/blood-pressure.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class BloodPressureDto {
    @ApiProperty({ example: 122 })
    @IsInt()
    systolic: number;

    @ApiProperty({ example: 76 })
    @IsInt()
    diastolic: number;
}
