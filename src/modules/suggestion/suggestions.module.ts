import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { Suggestion } from './entities/suggestion.entity';
import { AiService } from 'src/core/ai/ai.service';
import { AppConfigService } from 'src/common/app-config.service';
import { DirectionsModule } from '../directions/directions.module';
import { EventsModule } from '../events/events.module';
import { UserPreferencesModule } from '../user-preferences/user-preferences.module';
import { WeatherModule } from '../weather/weather.module';
import { HealthDataModule } from '../health-data/health-data.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Suggestion]),
        UserPreferencesModule,
        DirectionsModule,
        WeatherModule,
        EventsModule,
        HealthDataModule,
    ],
    providers: [SuggestionsService, AiService, AppConfigService],
    controllers: [SuggestionsController],
})
export class SuggestionsModule {}
