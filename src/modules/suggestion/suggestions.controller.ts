import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Suggestions')
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post()
  create(@Query('userId') userId: string, @Body() dto: CreateSuggestionDto) {
    return this.suggestionsService.create(userId, dto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.suggestionsService.findAll(userId);
  }
  @Get('selected')
  getSelectedSuggestions(@Query('userId') userId: string) {
    return this.suggestionsService.getSelectedByUser(userId);
  }
}
