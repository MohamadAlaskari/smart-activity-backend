import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { GetEventsFlatDto } from './dto/get-events-flat.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    @ApiOperation({
        summary: 'Lade Events nach Standort, Datum und optionalem Radius/Limit',
        description:
            'Lädt Events über die Ticketmaster API anhand von Koordinaten (lat/lon), Startdatum, optionalem Radius (in km) und Anzahl der Events (max. 200).',
    })
    @ApiResponse({
        status: 200,
        description: 'Events wurden erfolgreich geladen.',
    })
    @ApiResponse({
        status: 400,
        description: 'Ungültige Anfrageparameter (Validation Error).',
    })
    @ApiResponse({
        status: 500,
        description: 'Serverfehler beim Abrufen der Events.',
    })
    getAllEvents(@Query() query: GetEventsFlatDto) {
        const radius = query.radius ?? 100;
        const size = query.size ?? 50;

        return this.eventsService.getEventsByLocationAndDate(
            query.lat,
            query.lon,
            query.startDate,
            radius,
            size,
        );
    }
}
