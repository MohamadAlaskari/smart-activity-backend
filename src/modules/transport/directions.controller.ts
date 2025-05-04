import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from 'src/modules/transport/directions.service';
import { GetDirectionsDto } from './dto/get-directions.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    required: true,
    enum: ['driving', 'walking', 'bicycling', 'transit'],
  })
  @ApiResponse({ status: 200, description: 'Returns duration and distance' })
  getDirections(@Query() query: GetDirectionsDto) {
    return this.directionsService.getDirections(query);
  }
}
