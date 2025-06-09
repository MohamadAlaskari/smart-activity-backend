import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class CreateSuggestionDto {
  @ApiProperty({
    description: 'Context data used by AI to generate suggestions',
    example: {
      location: 'Bremen',
      coordinates: {
        lat: 53.079296,
        lon: 8.801694,
      },
      date: '2025-06-09',
      weather: {
        temp: 17.2,
        conditions: 'Partly Cloudy',
        icon: 'partly-cloudy-day',
      },
      preferences: {
        selectedVibes: ['Relaxed', 'Social'],
        budget: 20,
        distanceRadius: 5,
        selectedTimeWindows: ['Afternoon'],
        selectedGroupSizes: ['Solo'],
      },
      events: [
        {
          id: 'Z698xZC2Z1k-xuN7Y',
          title: 'Konzert in Bremen',
          date: '2025-06-10',
          venue: 'Theater Bremen',
        },
      ],
    },
  })
  @IsObject()
  context: Record<string, any>;
}
