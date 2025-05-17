import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GetDirectionsDto } from './dto/get-directions.dto';
import { GoogleDirectionsResponse } from './interfaces/directions-response.interface';
import { AppConfigService } from '../../common/app-config.service';
import { GOOGLE_DIRECTIONS_BASE_URL } from '../../common/utils/constants/directions.constants';

@Injectable()
export class DirectionsService {
  private readonly apiKey: string;

  constructor(private readonly config: AppConfigService) {
    this.apiKey = this.config.getGoogleMapsApiKey(); // new helper
  }

  async getDirections(query: GetDirectionsDto) {
    const url = this.buildUrl(query);

    try {
      const response = await axios.get<GoogleDirectionsResponse>(url);
      const route = response.data.routes?.[0];
      const leg = route?.legs?.[0];

      if (!leg) throw new InternalServerErrorException('No route found');

      return {
        duration: leg.duration.text,
        distance: leg.distance.text,
        mode: query.mode,
      };
    } catch {
      throw new InternalServerErrorException('Failed to fetch directions');
    }
  }

  private buildUrl(query: GetDirectionsDto): string {
    const { origin, destination, mode } = query;
    const params = new URLSearchParams({
      origin,
      destination,
      mode: mode || 'driving',
      key: this.apiKey,
    });

    return `${GOOGLE_DIRECTIONS_BASE_URL}?${params.toString()}`;
  }
}
