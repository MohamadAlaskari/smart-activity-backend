// src/core/ai/dto/structured-suggestion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class StructuredSuggestionDto {
  @ApiProperty({
    description: 'User prompt as input to OpenAI',
    example: 'Gib mir 5 Aktivitäten basierend auf dem folgenden Kontext',
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description: 'Dynamic context object with user, weather, events, etc.',
    example: {
      location: 'Berlin',
      date: '2025-06-03',
      preferences: { selectedVibes: ['Outdoors', 'Chill'] },
    },
  })
  @IsObject()
  context: Record<string, any>;
}
