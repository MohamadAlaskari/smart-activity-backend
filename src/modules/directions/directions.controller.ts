import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { GetDirectionsDto } from './dto/get-directions.dto';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBearerAuth,
    ApiQuery,
} from '@nestjs/swagger';
import { GetCityByCoordsDto } from './dto/get-city-by-coords.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Directions')
@Controller('directions')
export class DirectionsController {
    constructor(private readonly directionsService: DirectionsService) {}

    @Get('duration')
    @ApiOperation({ summary: 'Get duration and distance between two points' })
    @ApiQuery({ name: 'origin', required: true, example: 'Berlin' })
    @ApiQuery({ name: 'destination', required: true, example: 'Hamburg' })
    @ApiQuery({
        name: 'mode',
        required: false,
        enum: ['driving', 'walking', 'bicycling', 'transit'],
        example: 'driving',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns duration and distance',
    })
    getDirections(@Query() query: GetDirectionsDto) {
        return this.directionsService.getDirections(query);
    }

    @Get('resolve-city')
    @ApiOperation({ summary: 'Resolve city name from latitude and longitude' })
    @ApiQuery({ name: 'latitude', example: 52.52, required: true })
    @ApiQuery({ name: 'longitude', example: 13.405, required: true })
    @ApiResponse({ status: 200, description: 'Returns city name as string' })
    async getCityByCoordinates(
        @Query() query: GetCityByCoordsDto,
    ): Promise<string> {
        return this.directionsService.getCityFromCoordinates(
            query.latitude,
            query.longitude,
        );
    }
}
