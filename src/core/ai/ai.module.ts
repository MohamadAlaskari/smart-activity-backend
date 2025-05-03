import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [HttpModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
