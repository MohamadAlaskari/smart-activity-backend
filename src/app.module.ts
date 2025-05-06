import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AiModule } from './core/ai/ai.module';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './modules/weather/weather.module';
import { EventsModule } from './modules/events/events.module';
import { DirectionsModule } from './modules/transport/directions.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.production.local'],
      isGlobal: true,
    }),
    DatabaseModule,
    AiModule,
    UsersModule,
    WeatherModule,
    EventsModule,
    DirectionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
