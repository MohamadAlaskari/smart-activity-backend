import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suggestion } from './entities/suggestion.entity';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { AiService } from 'src/core/ai/ai.service';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    private readonly suggestionRepo: Repository<Suggestion>,
    private readonly aiService: AiService,
  ) {}

  async create(userId: string, dto: CreateSuggestionDto): Promise<Suggestion> {
    const prompt = 'Gib mir 10 Aktivitäten basierend auf dem folgenden Kontext';
    const content = await this.aiService.generateStructuredSuggestions(
      prompt,
      dto.context,
    );

    const suggestion = this.suggestionRepo.create({
      userId,
      content,
      selected: false,
    });

    return this.suggestionRepo.save(suggestion);
  }

  async findAll(userId: string): Promise<Suggestion[]> {
    return this.suggestionRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
  async getSelectedByUser(userId: string): Promise<Suggestion[]> {
    return this.suggestionRepo.find({
      where: {
        userId,
        selected: true,
      },
    });
  }
}
