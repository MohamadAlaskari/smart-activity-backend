import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchEventsDto {
  @ApiPropertyOptional({ example: 'Berlin' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'music' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
