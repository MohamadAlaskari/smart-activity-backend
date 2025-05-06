import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ConfigService } from '@nestjs/config/dist/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // *Globale Middleware*
  //Auto-Validation
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  const configService = app.get(ConfigService);
  console.log('JWT_SECRET from env:', configService.get('JWT_SECRET'));
  // Swagger API-Dokumentation einrichten
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
