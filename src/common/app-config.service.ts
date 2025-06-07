// src/common/app-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WEATHER_CONFIG_KEYS } from './utils/constants/weather.constants';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get visualCrossingApiKey(): string {
    const key = this.configService.get<string>(WEATHER_CONFIG_KEYS.API_KEY);
    if (!key) throw new Error('Missing VISUAL_CROSSING_API_KEY');
    return key;
  }
  getGoogleMapsApiKey(): string {
    const key = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    if (!key) throw new Error('Missing GOOGLE_MAPS_API_KEY');
    return key;
  }

  getTicketmasterApiKey(): string {
    const key = this.configService.get<string>('TICKETMASTER_API_KEY');
    if (!key) throw new Error('Missing TICKETMASTER_API_KEY');
    return key;
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }
}
