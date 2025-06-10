import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { AppConfigService } from 'src/common/app-config.service';

@Module({
    controllers: [EventsController],
    providers: [EventsService, AppConfigService],
    exports: [EventsService],
})
export class EventsModule {}
