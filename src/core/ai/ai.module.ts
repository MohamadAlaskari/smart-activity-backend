import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AppConfigService } from 'src/common/app-config.service';

@Module({
  imports: [HttpModule],
  controllers: [AiController],
  providers: [AiService, AppConfigService],
})
export class AiModule {}
