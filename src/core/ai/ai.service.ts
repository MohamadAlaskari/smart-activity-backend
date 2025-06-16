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
                throw new InternalServerErrorException(
                    'No content from OpenAI',
                );
            }

            return messageContent.trim();
        } catch (error) {
            this.handleOpenAiError(error);
        }
    }

    async generateStructuredSuggestions(
        systemPrompt: string,
        userPrompt: string,

        context: any,
    ): Promise<SuggestionResultDto[]> {
        try {
            const messages: ChatCompletionMessageParam[] = [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: userPrompt,
                },
                {
                    role: 'user',
                    content: `Here is the context:\n${JSON.stringify(context)}`,
                },
                {
                    role: 'user',
                    content: `If the suggestion is based on a real event from the context, include its "url" property for ticket booking.`,
                },
                {
                    role: 'user',
                    content: `Structure example and formatting rules:
[
  {
    "title": "string",
    "description": "string",
    "category": "string",
    "location": {
      "name": "string",
      "address": "string",
      "lat": number,
      "lon": number
    },
    "distanceKm": number,
    "startTime": "YYYY-MM-DDTHH:mm:ss",
    "endTime": "YYYY-MM-DDTHH:mm:ss",
    "price": "string",
    "isTicketed": boolean,
    "vibeMatch": [ "string" ],
    "images": [ "string" ],
    "url": "string"  // leave empty string "" if not based on a real event
  }
]
Respond with only the array. No explanation.`,
                },
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
