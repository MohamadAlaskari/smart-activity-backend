// src/core/ai/ai.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PromptDto } from './dto/prompt.dto';
import { SuggestionResultDto } from './dto/suggestion-result.dto';
import { StructuredSuggestionDto } from './dto/structured-suggestions.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('suggestion')
  @ApiOperation({ summary: 'Get activity suggestion (text only)' })
  @ApiResponse({ status: 200, description: 'Text-based AI suggestion' })
  async getSuggestion(@Query() query: PromptDto): Promise<string> {
    return this.aiService.generateResponse(query.prompt);
  }

  @Post('structured-suggestions')
  @ApiOperation({ summary: 'Get structured JSON-based activity suggestions' })
  @ApiResponse({
    status: 200,
    description: 'Returns array of structured suggestion objects',
    type: SuggestionResultDto,
    isArray: true,
  })
  async getStructuredSuggestions(
    @Body() body: StructuredSuggestionDto,
  ): Promise<SuggestionResultDto[]> {
    return this.aiService.generateStructuredSuggestions(
      body.prompt,
      body.context,
    );
  }
}
