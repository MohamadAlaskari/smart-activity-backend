import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('AI') // Gruppe in Swagger
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('suggestion')
  @ApiOperation({ summary: 'Get activity suggestion based on prompt' })
  @ApiQuery({
    name: 'prompt',
    type: String,
    required: true,
    description: 'The input prompt for the AI model',
  })
  @ApiResponse({
    status: 200,
    description: 'AI-generated suggestion returned successfully',
  })
  async getSuggestion(@Query('prompt') prompt: string): Promise<string> {
    return this.aiService.generateResponse(prompt);
  }
}
