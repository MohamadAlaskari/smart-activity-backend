import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { AppConfigService } from 'src/common/app-config.service';

@Module({
    controllers: [DirectionsController],
    providers: [DirectionsService, AppConfigService],
    exports: [DirectionsService],
})
export class DirectionsModule {}
