import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { Suggestion } from './entities/suggestion.entity';
import { AiService } from 'src/core/ai/ai.service';
import { AppConfigService } from 'src/common/app-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion])],
  providers: [SuggestionsService, AiService, AppConfigService],
  controllers: [SuggestionsController],
})
export class SuggestionsModule {}
