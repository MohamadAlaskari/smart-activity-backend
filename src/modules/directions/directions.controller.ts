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
}
