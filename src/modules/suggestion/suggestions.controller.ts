import { Controller, Get, Query } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import {
    //  ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
//import { AuthGuard } from 'src/common/guards/auth.guard';

//@UseGuards(AuthGuard)
//@ApiBearerAuth()
@ApiTags('Suggestions')
@Controller('suggestions')
export class SuggestionsController {
    constructor(private readonly suggestionsService: SuggestionsService) {}

    @Get()
    @ApiOperation({
        summary: 'Generate AI-based activity suggestions for a user',
    })
    @ApiResponse({ status: 200, description: 'List of suggested activities' })
    async getSuggestions(@Query() query: CreateSuggestionDto): Promise<any[]> {
        const { userId, lat, lon, date } = query;
        return this.suggestionsService.generateSuggestionsForUser(
            userId,
            { lat, lon },
            date,
        );
    }
}
