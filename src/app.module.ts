import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AiModule } from './core/ai/ai.module';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './modules/weather/weather.module';
import { EventsModule } from './modules/events/events.module';
//import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.production.local'],
      isGlobal: true,
    }),
    //   DatabaseModule,
    AiModule,
    WeatherModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
