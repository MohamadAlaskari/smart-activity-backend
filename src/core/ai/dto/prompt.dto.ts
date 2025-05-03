// src/core/ai/dto/prompt.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class PromptDto {
  @ApiProperty({
    description: 'User input for the language model',
    example: 'Suggest a creative activity for today',
  })
  @IsString()
  @MinLength(3, { message: 'Prompt must be at least 3 characters long' })
  prompt: string;
}
