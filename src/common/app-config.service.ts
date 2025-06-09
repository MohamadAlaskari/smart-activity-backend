// src/common/app-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WEATHER_CONFIG_KEYS } from './utils/constants/weather.constants';
import { AI_CONFIG_KEYS, OPENAI_MODEL } from './utils/constants/ai.constant';
import {
  DIRECTIONS_CONFIG_KEYS,
  MAPBOX_CONFIG_KEYS,
} from './utils/constants/directions.constants';
import { EVENTS_CONFIG_KEYS } from './utils/constants/events.constants';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get visualCrossingApiKey(): string {
    const key = this.configService.get<string>(WEATHER_CONFIG_KEYS.API_KEY);
    if (!key) throw new Error('Missing VISUAL_CROSSING_API_KEY');
    return key;
  }
  getGoogleMapsApiKey(): string {
    const key = this.configService.get<string>(DIRECTIONS_CONFIG_KEYS.API_KEY);
    if (!key) throw new Error('Missing GOOGLE_MAPS_API_KEY');
    return key;
  }

  getMapboxApiKey(): string {
    const key = this.configService.get<string>(MAPBOX_CONFIG_KEYS.API_KEY);
    if (!key) throw new Error('Missing MAPBOX_ACCESS_TOKEN');
    return key;
  }

  getTicketmasterApiKey(): string {
    const key = this.configService.get<string>(EVENTS_CONFIG_KEYS.API_KEY);
    if (!key) throw new Error('Missing TICKETMASTER_API_KEY');
    return key;
  }
  get openAiApiKey(): string {
    const key = this.configService.get<string>(AI_CONFIG_KEYS.API_KEY);
    if (!key) throw new Error('Missing OPENAI_API_KEY');
    return key;
  }
  get openAiModel(): string {
    const model = OPENAI_MODEL.OPENAI_MODEL;
    if (!model) throw new Error('Missing OPENAI_MODEL');
    return model;
  }
  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }
}
