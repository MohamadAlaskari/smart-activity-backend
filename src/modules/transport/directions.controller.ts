import { Body, Controller, Post } from '@nestjs/common';
import { DirectionsService } from 'src/modules/transport/directions.service';
import { GetDirectionsDto } from './dto/get-directions.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Directions')
@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Post('duration')
  @ApiOperation({ summary: 'Get duration and distance between two points' })
  @ApiBody({
    description:
      'Request body containing origin, destination, and transport mode',
    type: GetDirectionsDto,
  })
  @ApiResponse({ status: 200, description: 'Returns duration and distance' })
  getDirections(@Body() body: GetDirectionsDto) {
    return this.directionsService.getDirections(body);
  }
}
