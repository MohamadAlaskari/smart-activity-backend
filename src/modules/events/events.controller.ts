import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetEventsDto } from './dto/get-events.dto';
import { EventResult } from './interfaces/ticketmaster-response.interface';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get events filtered by city, date, status, category or time',
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered list of events returned',
  })
  @ApiQuery({ name: 'location', required: false, example: 'Berlin' })
  @ApiQuery({ name: 'rangeStart', required: false, example: '2025-05-20' })
  @ApiQuery({ name: 'rangeEnd', required: false, example: '2025-05-30' })
  @ApiQuery({ name: 'status', required: false, example: 'onsale' })
  @ApiQuery({ name: 'category', required: false, example: 'Music' })
  @ApiQuery({
    name: 'time',
    required: false,
    example: 'evening',
    enum: ['morning', 'afternoon', 'evening'],
  })
  async getFilteredEvents(
    @Query() query: GetEventsDto,
  ): Promise<EventResult[]> {
    return this.eventsService.getFilteredEvents(query);
  }
}
