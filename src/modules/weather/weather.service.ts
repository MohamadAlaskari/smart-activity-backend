import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface OpenWeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(location: string) {
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=de`;

      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherResponse>(url),
      );
      const data = response.data;

      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        isRainy: data.weather[0].main.toLowerCase().includes('rain'),
        isCold: data.main.temp < 10,
      };
    } catch {
      throw new InternalServerErrorException(
        'Fehler beim Abrufen der Wetterdaten',
      );
    }
  }
}
