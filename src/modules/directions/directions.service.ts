import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GetDirectionsDto } from './dto/get-directions.dto';
import { GoogleDirectionsResponse } from './interfaces/directions-response.interface';
import { AppConfigService } from '../../common/app-config.service';
import {
  GOOGLE_DIRECTIONS_BASE_URL,
  MAPBOX_GEOCODING_BASE_URL,
} from '../../common/utils/constants/directions.constants';
import { MapboxGeocodeResponse } from './interfaces/mapbox-geocode-response.interface';

@Injectable()
export class DirectionsService {
  private readonly apiKey: string;

  constructor(private readonly config: AppConfigService) {
    this.apiKey = this.config.getGoogleMapsApiKey();
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
  async getCityFromCoordinates(lat: number, lon: number): Promise<string> {
    const token = this.config.getMapboxApiKey();
    const url = `${MAPBOX_GEOCODING_BASE_URL}/${lon},${lat}.json?access_token=${token}`;

    try {
      const response = await axios.get<MapboxGeocodeResponse>(url);
      const features = response.data.features;

      const city = features.find((f) => f.place_type.includes('place'));

      return city?.text || 'Unknown City';
    } catch {
      throw new InternalServerErrorException(
        'Failed to resolve city name from Mapbox',
      );
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
