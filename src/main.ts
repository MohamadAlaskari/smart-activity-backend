import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // *Globale Middleware*
  //Auto-Validation
  // app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  // Swagger API-Dokumentation einrichten
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
