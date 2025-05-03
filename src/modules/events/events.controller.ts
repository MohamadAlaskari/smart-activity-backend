import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { SearchEventsDto } from './dto/search-events.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of events based on search criteria' })
  @ApiResponse({ status: 200, description: 'List of matching events returned' })
  async searchEvents(@Query() query: SearchEventsDto) {
    return this.eventsService.searchEvents(query);
  }
}
