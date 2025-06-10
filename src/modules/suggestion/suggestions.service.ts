import { Injectable, NotFoundException } from '@nestjs/common';
import { DirectionsService } from '../directions/directions.service';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { EventsService } from '../events/events.service';
import { WeatherService } from '../weather/weather.service';
import { AiService } from 'src/core/ai/ai.service';

interface Coordinates {
    lat: number;
    lon: number;
}

interface SuggestionContext {
    userId: string;
    coordinates: Coordinates;
    city: string;
    date: string;
    preferences: any; // kannst du durch dein Preferences DTO/Entity ersetzen
    weather: any; // ggf. ForecastResponse Interface verwenden
    events: any; // ggf. EventResponse[]
}

@Injectable()
export class SuggestionsService {
    constructor(
        private readonly directionsService: DirectionsService,
        private readonly userPreferencesService: UserPreferencesService,
        private readonly weatherService: WeatherService,
        private readonly eventsService: EventsService,
        private readonly aiService: AiService,
    ) {}

    async generateSuggestionsForUser(
        userId: string,
        coordinates: Coordinates,
        date: string,
    ): Promise<any[]> {
        const context = await this.buildContextForUser(
            userId,
            coordinates,
            date,
        );
        const prompt: string = `Generate 7 structured suggestions for user ${userId} in ${context.city} on ${context.date} based on this:}`;

        const suggestions = await this.aiService.generateStructuredSuggestions(
            prompt,
            context,
        );
        return suggestions;
    }

    private async buildContextForUser(
        userId: string,
        coordinates: Coordinates,
        date: string,
    ): Promise<SuggestionContext> {
        const { lat, lon } = coordinates;

        // 🏙️ Stadtname ermitteln
        const cityResult = await this.directionsService.getCityFromCoordinates(
            lat,
            lon,
        );
        const city = cityResult ?? 'Unknown';

        // 💡 Nutzerpräferenzen holen
        const preferences =
            await this.userPreferencesService.getByUserId(userId);
        if (!preferences) {
            throw new NotFoundException(
                `Preferences not found for user ${userId}`,
            );
        }

        // ☀️ Wettervorhersage
        const weather = await this.weatherService.getForecastByDate(
            lat,
            lon,
            date,
        );

        // 🎫 Events abrufen
        const events = await this.eventsService.getEventsByLocationAndDate(
            lat,
            lon,
            date,
            preferences.distanceRadius || 50,
            20,
        );
        const req = {
            userId,
            coordinates: { lat, lon },
            city,
            date,
            preferences,
            weather,
            events,
        };
        console.log('Generated context for user:', req);
        return req;
    }
}
