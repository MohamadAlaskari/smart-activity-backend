import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { PromptDto } from './dto/prompt.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('suggestion')
  @ApiOperation({ summary: 'Get activity suggestion based on prompt' })
  @ApiResponse({
    status: 200,
    description: 'AI-generated suggestion returned successfully',
  })
  async getSuggestion(@Query() query: PromptDto): Promise<string> {
    return this.aiService.generateResponse(query.prompt);
  }
}
