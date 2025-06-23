// src/modules/health-data/dto/create-health-data.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
    IsInt,
    IsOptional,
    IsString,
    IsNumber,
    IsDateString,
    ValidateNested,
    IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BloodPressureDto } from './blood-pressure.dto';

export class CreateHealthDataDto {
    @ApiProperty({ example: '2024-06-23', required: false })
    @IsDateString()
    date: string;

    @ApiProperty({ example: 8321, required: false })
    @IsOptional()
    @IsInt()
    steps_today?: number;

    @ApiProperty({ example: 7540, required: false })
    @IsOptional()
    @IsInt()
    steps_week_average?: number;

    @ApiProperty({ example: 47, required: false })
    @IsOptional()
    @IsInt()
    activity_minutes_today?: number;

    @ApiProperty({ example: 35, required: false })
    @IsOptional()
    @IsInt()
    activity_minutes_week_average?: number;

    @ApiProperty({ example: 60, required: false })
    @IsOptional()
    @IsInt()
    resting_heart_rate?: number;

    @ApiProperty({ example: 7.2, required: false })
    @IsOptional()
    @IsNumber()
    sleep_hours_last_night?: number;

    @ApiProperty({ example: 6.9, required: false })
    @IsOptional()
    @IsNumber()
    sleep_hours_week_average?: number;

    @ApiProperty({ example: 'good', required: false })
    @IsOptional()
    @IsString()
    sleep_quality?: string;

    @ApiProperty({ example: 1850, required: false })
    @IsOptional()
    @IsInt()
    calories_burned_today?: number;

    @ApiProperty({ example: 'Running', required: false })
    @IsOptional()
    @IsString()
    workout_type_last?: string;

    @ApiProperty({ example: 35, required: false })
    @IsOptional()
    @IsInt()
    workout_duration_last?: number;

    @ApiProperty({ example: 3, required: false })
    @IsOptional()
    @IsInt()
    workout_frequency_week?: number;

    @ApiProperty({ example: 'low', required: false })
    @IsOptional()
    @IsString()
    stress_level?: string;

    @ApiProperty({ example: 78, required: false })
    @IsOptional()
    @IsNumber()
    weight_kg?: number;

    @ApiProperty({ example: 24.1, required: false })
    @IsOptional()
    @IsNumber()
    bmi?: number;

    @ApiProperty({ required: false, type: BloodPressureDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => BloodPressureDto)
    blood_pressure?: BloodPressureDto;

    @ApiProperty({ example: 520, required: false })
    @IsOptional()
    @IsInt()
    active_energy_burned_today?: number;

    @ApiProperty({ example: 1700, required: false })
    @IsOptional()
    @IsInt()
    hydration_ml_today?: number;

    @ApiProperty({ example: 'happy', required: false })
    @IsOptional()
    @IsString()
    mood_today?: string;

    @ApiProperty({ example: 'none', required: false })
    @IsOptional()
    @IsString()
    menstruation_phase?: string;
}
