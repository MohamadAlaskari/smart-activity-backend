import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class StructuredSuggestionDto {
  @ApiProperty({
    description: 'User prompt as input to OpenAI',
    example: 'Gib mir 5 Aktivitäten basierend auf dem folgenden Kontext',
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description:
      'Structured context including location, coordinates, weather, preferences, and events',
    example: {
      location: 'Bremen',
      coordinates: {
        lat: 53.079296,
        lon: 8.801694,
      },
      date: '2025-06-07',
      weather: {
        datetime: '2025-06-09',
        datetimeEpoch: 1749420000,
        tempmax: 17.7,
        tempmin: 11,
        temp: 14.2,
        feelslikemax: 17.7,
        feelslikemin: 11,
        feelslike: 14.2,
        dew: 8.4,
        humidity: 69.3,
        precip: 1.2,
        precipprob: 100,
        precipcover: 37.5,
        preciptype: ['rain'],
        snow: 0,
        snowdepth: 0,
        windgust: 47.5,
        windspeed: 35.3,
        winddir: 267.3,
        pressure: 1019.6,
        cloudcover: 63.9,
        visibility: 18.2,
        solarradiation: 289.3,
        solarenergy: 24.9,
        uvindex: 8,
        severerisk: 10,
        sunrise: '04:44:39',
        sunriseEpoch: 1749437079,
        sunset: '21:27:32',
        sunsetEpoch: 1749497252,
        moonphase: 0.44,
        conditions: 'Rain, Partially cloudy',
        description:
          'Partly cloudy throughout the day with rain clearing later.',
        icon: 'rain',
        stations: ['EDDB', 'E2835'],
        source: 'comb',
      },
      preferences: {
        id: 1,
        selectedVibes: ['Movement', 'Culture'],
        rememberVibe: true,
        selectedLifeVibes: ['Creative', 'Chill'],
        selectedExperienceTypes: ['Adventurous', 'Peaceful'],
        budget: 30,
        rememberBudget: false,
        distanceRadius: 10,
        rememberDistance: true,
        selectedTimeWindows: ['Morning', 'Evening'],
        rememberTimeWindow: false,
        selectedGroupSizes: ['Solo', 'Group'],
      },
      events: [
        {
          id: 'Z698xZC2Z17448S',
          title: 'SPECTRUM CONCERTS BERLIN II.',
          url: 'https://www.ticketmaster.de/event/spectrum-concerts-berlin-ii-tickets/555433?language=en-us',
          date: '2025-06-10',
          time: '20:00:00',
          venue: 'Unknown venue',
          address: 'Herbert-von-Karajan-Straße 1, 10785 Berlin',
          city: 'Berlin',
          category: 'Arts & Theatre',
          genre: 'Theatre',
          image:
            'https://s1.ticketm.net/dam/a/01a/099eee20-11d5-4058-bf76-4df03fcf701a_1092671_TABLET_LANDSCAPE_LARGE_16_9.jpg',
          status: 'onsale',
          salesStart: '2024-12-01T13:00:00Z',
          salesEnd: '2025-06-10T21:59:00Z',
          ageRestriction: false,
        },
        {
          id: 'Z698xZC2Z1k-xuN7Y',
          title: 'Jensen McRae',
          url: 'https://www.ticketmaster.de/event/jensen-mcrae-tickets/862363130?language=en-us',
          date: '2025-06-10',
          time: '20:00:00',
          venue: 'Unknown venue',
          address: 'Skalitzer Straße 85-86, 10997 Berlin',
          city: 'Berlin',
          category: 'Music',
          genre: 'Rock',
          image:
            'https://s1.ticketm.net/dam/a/568/6a17a829-79ef-4728-aa91-bd11f86ac568_RETINA_PORTRAIT_3_2.jpg',
          status: 'onsale',
          seatmapUrl:
            'https://media.ticketmaster.eu/germany/45b8b0699a5b051d50a9f3efdc3b8b55.png',
          salesStart: '2025-02-27T09:00:00Z',
          salesEnd: '2025-06-10T18:00:00Z',
          ageRestriction: false,
        },
      ],
    },
  })
  @IsObject()
  context: Record<string, any>;
}
