import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ArrayMaxSize,
} from 'class-validator';

export class CreateUserPreferencesDto {
  @ApiProperty({ type: [String], example: ['Movement', 'Culture'] })
  @IsArray()
  @IsString({ each: true })
  selectedVibes: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  rememberVibe: boolean;

  @ApiProperty({ type: [String], example: ['Creative', 'Chill'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(3)
  selectedLifeVibes: string[];

  @ApiProperty({ type: [String], example: ['Adventurous', 'Peaceful'] })
  @IsArray()
  @IsString({ each: true })
  selectedExperienceTypes: string[];

  @ApiProperty({ example: 30.0 })
  @IsNumber()
  budget: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  rememberBudget: boolean;

  @ApiProperty({ example: 10.0 })
  @IsNumber()
  distanceRadius: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  rememberDistance: boolean;

  @ApiProperty({ type: [String], example: ['Morning', 'Evening'] })
  @IsArray()
  @IsString({ each: true })
  selectedTimeWindows: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  rememberTimeWindow: boolean;

  @ApiProperty({ type: [String], example: ['Solo', 'Group'] })
  @IsArray()
  @IsString({ each: true })
  selectedGroupSizes: string[];

  @ApiProperty({ example: 'Bremen' })
  @IsString()
  location: string;

  @ApiProperty({ example: '2025-06-07' })
  @IsString()
  date: string;
}
