import {
  IsOptional,
  IsArray,
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PreferredTime } from '../enums/preferred-time.enum';
import { TransportMode } from '../enums/transport-mode.enum';
import { PreferenceGoal } from '../enums/preferences-goals.enum';

export class CreateUserPreferencesDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['cinema', 'hiking'], required: false })
  favoriteActivities?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(PreferredTime, { each: true })
  @ApiProperty({ enum: PreferredTime, isArray: true, required: false })
  preferredTimes?: PreferredTime[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, required: false })
  likesGroupActivities?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 50.0, required: false })
  budgetMin?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 200.0, required: false })
  budgetMax?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(TransportMode, { each: true })
  @ApiProperty({ enum: TransportMode, isArray: true, required: false })
  preferredTransportModes?: TransportMode[];

  @IsOptional()
  @IsArray()
  @IsEnum(PreferenceGoal, { each: true })
  @ApiProperty({ enum: PreferenceGoal, isArray: true, required: false })
  goals?: PreferenceGoal[];
}
