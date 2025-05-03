import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AiModule } from './core/ai/ai.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.production.local'],
      isGlobal: true,
    }),
    AiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
