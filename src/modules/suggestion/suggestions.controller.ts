import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Suggestions')
@Controller('suggestions')
export class SuggestionsController {
    constructor(private readonly suggestionsService: SuggestionsService) {}

    @Get()
    @ApiOperation({
        summary: 'Generate AI-based activity suggestions for the current user',
    })
    @ApiQuery({
        name: 'lat',
        type: Number,
        required: true,
        example: 52.52,
        description: 'Latitude of the user location',
    })
    @ApiQuery({
        name: 'lon',
        type: Number,
        required: true,
        example: 13.405,
        description: 'Longitude of the user location',
    })
    @ApiQuery({
        name: 'date',
        type: String,
        required: true,
        example: '2024-06-23',
        description: 'Date for suggestions (YYYY-MM-DD)',
    })
    @ApiResponse({
        status: 200,
        description: 'List of suggested activities',
        type: [Object],
    }) // Typ ggf. ersetzen!
    async getSuggestions(
        @CurrentUser() user: User,
        @Query('lat') lat: number,
        @Query('lon') lon: number,
        @Query('date') date: string,
    ): Promise<any[]> {
        return this.suggestionsService.generateSuggestionsForUser(
            user.id,
            { lat, lon },
            date,
        );
    }
}
