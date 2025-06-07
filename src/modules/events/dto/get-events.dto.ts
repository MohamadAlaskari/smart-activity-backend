import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '../enums/event-status.enum';
import { EventTimeSegment } from '../enums/event-time.enum';

export class GetEventsDto {
  @ApiPropertyOptional({ example: 'Berlin' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: '2025-05-20' })
  @IsOptional()
  @IsString()
  rangeStart?: string;

  @ApiPropertyOptional({ example: '2025-05-30' })
  @IsOptional()
  @IsString()
  rangeEnd?: string;

  @ApiPropertyOptional({
    example: EventStatus.ONSALE,
    enum: EventStatus,
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({ example: 'Music' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: EventTimeSegment.EVENING,
    enum: EventTimeSegment,
  })
  @IsOptional()
  @IsEnum(EventTimeSegment)
  time?: EventTimeSegment;
}
