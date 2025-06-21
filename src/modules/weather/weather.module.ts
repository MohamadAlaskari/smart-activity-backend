import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { AppConfigService } from 'src/common/app-config.service';

@Module({
    imports: [HttpModule],
    controllers: [WeatherController],
    providers: [WeatherService, AppConfigService],
    exports: [WeatherService],
})
export class WeatherModule {}
