// ai.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

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
      console.error('Fehler bei OpenAI:', error);
      throw new InternalServerErrorException('OpenAI-Anfrage fehlgeschlagen');
    }
  }
}
