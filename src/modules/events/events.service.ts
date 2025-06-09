import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfigService } from 'src/common/app-config.service';
import { TICKETMASTER_BASE_URL } from 'src/common/utils/constants/events.constants';
import axios from 'axios';

@Injectable()
export class EventsService {
  private readonly apiKey: string;

  constructor(private readonly config: AppConfigService) {
    this.apiKey = this.config.getTicketmasterApiKey();
  }

  async getEventsByLocationAndDate(
    lat: number,
    lon: number,
    startDate: string,
    radius: number,
    size: number,
  ): Promise<any[]> {
    try {
      const params = {
        apikey: this.apiKey,
        latlong: `${lat},${lon}`,
        radius: radius.toString(),
        unit: 'km',
        startDateTime: new Date(startDate).toISOString().split('.')[0] + 'Z',
        sort: 'date,asc',
        size: size.toString(),
      };
      console.log('StartDate:', startDate);
      console.log('StartDateTime ISO:', new Date(startDate).toISOString());

      const response = await axios.get<any>(TICKETMASTER_BASE_URL, { params });
      const events = (response.data as any[]) ?? ([] as any[]);

      return events;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Ticketmaster API error:',
          error.response?.data || error.message,
        );
      } else {
        console.error('Unexpected error:', error);
      }
      throw new InternalServerErrorException('Unable to retrieve events.');
    }
  }
}
