import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { AiModule } from './core/ai/ai.module';
import { WeatherModule } from './modules/weather/weather.module';
import { EventsModule } from './modules/events/events.module';
import { DirectionsModule } from './modules/directions/directions.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserPreferencesModule } from './modules/user-preferences/user-preferences.module';
import { SuggestionsModule } from './modules/suggestion/suggestions.module';
import { HealthDataModule } from './modules/health-data/health-data.module';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: [
                '.env',
                '.env.development.local',
                '.env.production.local',
            ],
            isGlobal: true,
        }),
        DatabaseModule,
        AuthModule,
        UsersModule,
        UserPreferencesModule,
        HealthDataModule,
        AiModule,
        WeatherModule,
        EventsModule,
        DirectionsModule,
        SuggestionsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
