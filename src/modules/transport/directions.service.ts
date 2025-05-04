import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { GetDirectionsDto } from './dto/get-directions.dto';
import { GoogleDirectionsResponse } from './interfaces/directions-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(private readonly configService: ConfigService) {}
  async getDirections(query: GetDirectionsDto) {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException('API key not found');
    }

    try {
      const response = await axios.get<GoogleDirectionsResponse>(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: query.origin,
            destination: query.destination,
            mode: query.mode || 'driving',
            key: apiKey,
          },
        },
      );

      const route = response.data.routes?.[0];
      const leg = route?.legs?.[0];

      if (!leg) {
        throw new InternalServerErrorException('No route found');
      }

      return {
        duration: leg.duration.text,
        distance: leg.distance.text,
        mode: query.mode,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Google Directions API Error:', axiosError.message);
      throw new InternalServerErrorException('Failed to fetch directions');
    }
  }
}
