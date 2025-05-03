// ai.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      const messageContent = response.choices[0]?.message?.content;
      if (!messageContent) {
        throw new InternalServerErrorException('Ungültige Antwort von OpenAI');
      }
      return messageContent.trim();
    } catch (error) {
      const openaiMessage =
        (error as { error?: { message?: string } })?.error?.message ||
        (error as { message?: string })?.message;

      this.logger.error('OpenAI Error:', error);

      // Spezifischere Fehlerbehandlung:
      switch ((error as { status?: number })?.status) {
        case 401:
          throw new UnauthorizedException('Invalid OpenAI API key.');
        case 429:
          throw new ServiceUnavailableException(
            'Rate limit exceeded. Try again later.',
          );
        case 400:
          throw new BadRequestException(
            openaiMessage || 'Bad request to OpenAI.',
          );
        default:
          throw new InternalServerErrorException(
            openaiMessage || 'OpenAI request failed.',
          );
      }
    }
  }
}
