import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppConfigService } from 'src/common/app-config.service';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { SuggestionResultDto } from './dto/suggestion-result.dto';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly appConfigService: AppConfigService) {
    this.openai = new OpenAI({
      apiKey: this.appConfigService.openAiApiKey,
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.appConfigService.openAiModel,
        messages: [{ role: 'user', content: prompt }],
      });

      const messageContent = response.choices[0]?.message?.content;
      if (!messageContent) {
        throw new InternalServerErrorException('No content from OpenAI');
      }

      return messageContent.trim();
    } catch (error) {
      this.handleOpenAiError(error);
    }
  }

  async generateStructuredSuggestions(
    prompt: string,
    context: any,
  ): Promise<SuggestionResultDto[]> {
    try {
      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `You are an assistant that generates suggestions as a valid JSON array of objects with the following structure:

[
  {
    "title": "Open-Air Yoga im Park",
    "description": "Entspannende Yoga-Session unter freiem Himmel. Matte mitbringen.",
    "category": "Health & Wellness",
    "location": {
      "name": "Volkspark Friedrichshain",
      "address": "Friedrichshain, Berlin",
      "lat": 52.528300,
      "lon": 13.431000
    },
    "distanceKm": 2.3,
    "startTime": "2025-06-03T09:30:00",
    "endTime": "2025-06-03T11:00:00",
    "price": "Free",
    "isTicketed": false,
    "vibeMatch": ["Outdoors", "Chill"]
  }
]

Respond with only the JSON array. Do not include explanations or formatting.`,
        },
        { role: 'user', content: prompt },
        { role: 'user', content: `Context: ${JSON.stringify(context)}` },
      ];

      const response = await this.openai.chat.completions.create({
        model: this.appConfigService.openAiModel,
        messages,
      });

      const messageContent = response.choices[0]?.message?.content;
      if (!messageContent)
        throw new InternalServerErrorException('Empty OpenAI response');

      return this.parseJsonArray(messageContent);
    } catch (error) {
      this.handleOpenAiError(error);
    }
  }

  private parseJsonArray(content: string): SuggestionResultDto[] {
    try {
      const parsed = JSON.parse(content) as SuggestionResultDto[];
      if (!Array.isArray(parsed)) throw new Error('Expected JSON array');
      return parsed;
    } catch {
      throw new InternalServerErrorException(
        'Failed to parse JSON from OpenAI',
      );
    }
  }

  handleOpenAiError(error: unknown): never {
    const err = error as {
      status?: number;
      message?: string;
      error?: { message?: string };
    };
    const msg = err?.error?.message || err?.message || 'OpenAI Error';
    this.logger.error('OpenAI Error:', err);

    switch (err?.status) {
      case 401:
        throw new UnauthorizedException('Invalid OpenAI API key.');
      case 429:
        throw new ServiceUnavailableException('Rate limit exceeded');
      case 400:
        throw new BadRequestException(msg);
      default:
        throw new InternalServerErrorException(msg);
    }
  }
}
