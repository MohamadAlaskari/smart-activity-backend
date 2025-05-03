import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { SearchEventsDto } from './dto/search-events.dto';

interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  _embedded?: {
    venues: {
      name: string;
      city: {
        name: string;
      };
    }[];
  };
}

interface TicketmasterApiResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
}

@Injectable()
export class EventsService {
  async searchEvents(query: SearchEventsDto) {
    const apiKey = process.env.TICKETMASTER_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException('Ticketmaster API key is missing');
    }

    try {
      const response = await axios.get<TicketmasterApiResponse>(
        'https://app.ticketmaster.com/discovery/v2/events.json',
        {
          params: {
            apikey: apiKey,
            city: query.location || 'Berlin',
            keyword: query.keyword || '',
            classificationName: 'music',
            sort: 'date,asc',
          },
        },
      );

      const events = response.data._embedded?.events;

      if (!events || events.length === 0) return [];

      return events.map((event) => ({
        id: event.id,
        title: event.name,
        url: event.url,
        date: event.dates.start.localDate,
        time: event.dates.start.localTime,
        venue: event._embedded?.venues?.[0]?.name || 'Unknown venue',
        city:
          event._embedded?.venues?.[0]?.city?.name ||
          query.location ||
          'Unknown city',
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = axiosError.response?.data || axiosError.message;
      console.error('Ticketmaster API error:', message);
      throw new InternalServerErrorException(
        'Failed to fetch events from Ticketmaster',
      );
    }
  }
}
