import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetEventsDto } from './dto/get-events.dto';
import {
  EventResult,
  TicketmasterApiResponse,
  TicketmasterEvent,
} from './interfaces/ticketmaster-response.interface';
import { AppConfigService } from 'src/common/app-config.service';
import { TICKETMASTER_BASE_URL } from 'src/common/utils/constants/events.constants';
import { EventTimeSegment } from './enums/event-time.enum';
import axios from 'axios';
import { EventStatus } from './enums/event-status.enum';

@Injectable()
export class EventsService {
  private readonly apiKey: string;

  constructor(private readonly config: AppConfigService) {
    this.apiKey = this.config.getTicketmasterApiKey();
  }

  async getFilteredEvents(query: GetEventsDto): Promise<EventResult[]> {
    try {
      const params = {
        apikey: this.apiKey,
        countryCode: 'DE',
        city: query.location,
        classificationName: query.category,
        startDateTime: query.rangeStart
          ? new Date(query.rangeStart).toISOString()
          : undefined,
        endDateTime: query.rangeEnd
          ? new Date(query.rangeEnd).toISOString()
          : undefined,
        sort: 'date,asc',
      };

      const response = await axios.get<TicketmasterApiResponse>(
        TICKETMASTER_BASE_URL,
        { params },
      );

      const events = response.data._embedded?.events ?? [];
      return events
        .filter((event) => this.matchesFilters(event, query))
        .map((event) => this.mapToResult(event, query.location));
    } catch (error) {
      const message = (
        axios.isAxiosError(error)
          ? error.response?.data || error.message
          : error
      ) as string;

      console.error('Ticketmaster API error:', message);
      throw new InternalServerErrorException(
        'Unable to retrieve events at the moment.',
      );
    }
  }

  private matchesFilters(
    event: TicketmasterEvent,
    query: GetEventsDto,
  ): boolean {
    const status = event.dates.status.code;
    const time = event.dates.start.localTime;

    return (
      (!query.status || (status as EventStatus) === query.status) &&
      (!query.time || this.matchesTimeSegment(time, query.time))
    );
  }

  private matchesTimeSegment(
    time: string | undefined,
    segment: EventTimeSegment,
  ): boolean {
    if (!time) return false;
    const hour = parseInt(time.split(':')[0], 10);

    return (
      (segment === EventTimeSegment.MORNING && hour >= 6 && hour < 12) ||
      (segment === EventTimeSegment.AFTERNOON && hour >= 12 && hour < 18) ||
      (segment === EventTimeSegment.EVENING && hour >= 18)
    );
  }

  private mapToResult(
    event: TicketmasterEvent,
    fallbackCity?: string,
  ): EventResult {
    const venue = event._embedded?.venues?.[0];
    const price = event.priceRanges?.[0];
    const sales = event.sales?.public;

    return {
      id: event.id,
      title: event.name,
      url: event.url,
      date: event.dates.start.localDate,
      time: event.dates.start.localTime,
      venue: venue?.name || 'Unknown venue',
      address: venue?.address?.line1,
      postalCode: venue?.postalCode,
      city: venue?.city?.name || fallbackCity || 'Unknown',
      category: event.classifications?.[0]?.segment?.name || 'Unknown category',
      genre: event.classifications?.[0]?.genre?.name,
      image: event.images?.[0]?.url,
      status: event.dates.status.code || 'unknown',
      seatmapUrl: event.seatmap?.staticUrl,
      priceMin: price?.min,
      priceMax: price?.max,
      currency: price?.currency,
      priceType: price?.type,
      salesStart: sales?.startDateTime,
      salesEnd: sales?.endDateTime,
      ageRestriction: event.ageRestrictions?.legalAgeEnforced ?? false,
      info: event.info,
    };
  }
}
